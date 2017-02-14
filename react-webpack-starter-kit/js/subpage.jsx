import React from 'react'
require("bootstrap-webpack")

import {Button} from 'react-bootstrap'
import * as reducers from './reducers.jsx'
import {connect} from 'react-redux'
import {ContentHeader, Content} from './adminlte.jsx'

class SubPage extends React.Component {

  buttonClicked () {
    alert("Clicked")
  }

  componentDidMount() {
    console.log('Component DID MOUNT!')   }

  render() {


    let {params} = this.props
    console.log(this.props)
    let ala = [12,25,35,40]
    return (
      <div>
      <div>
        <ContentHeader header="Subpage" description={params.id}></ContentHeader>
        <Content>
          Hello World!<br />
          <Button onClick={this.buttonClicked}> Click me!</Button>
        </Content>
      </div>


      </div>

    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(SubPage)
