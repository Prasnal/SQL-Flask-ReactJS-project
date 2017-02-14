import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'

class AddShopping extends React.Component {
  state = {
    userID: null,
    year:null,
    mounth:null,
    day:null,
    price:null,
  }

  send = () => {
    let payload = {userID: this.state.userID, year: this.state.year, mounth: this.state.mounth, day:this.state.day, price:this.state.price} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createShopping", {
      method: "POST",
      body: data
    }).then((response) => {
      this.props.refresh()
    })
  }

  handleInput = (fieldName, e) => {
    let val = e.target.value
    this.setState({[fieldName]: val})
  }


  render() {
    return(
      <Form horizontal>
        <Grid className="text-center">
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>ID użytkownika</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.userID} onChange={this.handleInput.bind(null,"userID")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Rok zakupów</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.year} onChange={this.handleInput.bind(null,"year")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Miesiąc zakupów</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.mounth} onChange={this.handleInput.bind(null,"mounth")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Dzień zakupów</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.day} onChange={this.handleInput.bind(null,"day")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Cena zakupów</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.price} onChange={this.handleInput.bind(null,"price")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj Zakupy!</Button>
      </Form>
    )
  }
}





class ShoppingTable extends React.Component {
  render() {
    let rows = this.props.data.map((user, i) => {
      return(
        <tr key={i}>
          <td>{user[0]}</td>
          <td>{user[1]}</td>
          <td>{user[2]}</td>
          <td>{user[3]}</td>
        </tr>)
    })
    return(
      <Table bordered condensed hover style={{width: "70%"}}>
        <thead>
          <tr>
            <th>ID Zakupów</th>
            <th>ID Użytkownika</th>
            <th>Data zakupów</th>
            <th>Kwota</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}



class Shopping extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {users: [{id: 1, name: "Ala"},
                   {id: 2, name: "Ola"}]}

  askForShopping = () => {
    let userListURL = "http://127.0.0.1:5000/zakupy"
    console.log("Ask for data", userListURL)
    fetch(userListURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json:', json)
      this.setState({users: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  componentDidMount() {
    console.log('Component DID MOUNT!')
    this.askForShopping()
  }


  render = () => {
    return (
      <div>
        <ContentHeader header="Zakupy dostępne w bazie"></ContentHeader>
        <Content>
          <ShoppingTable data={this.state.users} />
          <AddShopping refresh={this.askForShopping} />
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(Shopping)
