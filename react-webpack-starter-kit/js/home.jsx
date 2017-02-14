import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'

class Home extends React.Component {
  render() {
    return (
      <div>
        <ContentHeader header="Home"></ContentHeader>
        <Content>
          Data from store: {this.props.sample}
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(Home)
