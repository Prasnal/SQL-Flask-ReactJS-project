import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'

class AddShop extends React.Component {
  state = {
    shoppingID: null,
    name:null,
    city:null,
    code:null,
    number:null,
    street:null
  }

  send = () => {
    let payload = {shoppingID: this.state.shoppingID, name: this.state.name, city: this.state.city, code:this.state.code, number:this.state.number, street:this.state.street} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createShop", {
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
            <Col componentClass={ControlLabel} sm={4}>ID zakupów</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.shoppingID} onChange={this.handleInput.bind(null,"shoppingID")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Nazwa</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.name} onChange={this.handleInput.bind(null,"name")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Miasto</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.city} onChange={this.handleInput.bind(null,"city")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Kod</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.code} onChange={this.handleInput.bind(null,"code")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Numer</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.number} onChange={this.handleInput.bind(null,"number")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Ulica</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.street} onChange={this.handleInput.bind(null,"street")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj Sklep!</Button>
      </Form>
    )
  }
}





class ShopTable extends React.Component {
  render() {
    let rows = this.props.data.map((user, i) => {
      return(
        <tr key={i}>
          <td>{user[0]}</td>
          <td>{user[1]}</td>
          <td>{user[2]}</td>
          <td>{user[3]}</td>
          <td>{user[4]}</td>
          <td>{user[5]}</td>
          <td>{user[6]}</td>
        </tr>)
    })
    return(
      <Table bordered condensed hover style={{width: "70%"}}>
        <thead>
          <tr>
            <th>ID Sklepu</th>
            <th>ID Zakupow</th>
            <th>Nazwa sklepu</th>
            <th>Miejscowość</th>
            <th>Kod pocztowy</th>
            <th>Numer</th>
            <th>Ulica</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}


class Shop extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {users: [{id: 1, name: "Ala"},
                   {id: 2, name: "Ola"}]}

  askForShop = () => {
    let userListURL = "http://127.0.0.1:5000/sklep"
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
    this.askForShop()
  }


  render = () => {
    return (
      <div>
        <ContentHeader header="Sklepy dostępne w bazie"></ContentHeader>
        <Content>
          <ShopTable data={this.state.users} />
          <AddShop refresh={this.askForShop} />
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(Shop)
