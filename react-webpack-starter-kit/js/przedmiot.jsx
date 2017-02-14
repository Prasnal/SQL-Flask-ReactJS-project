import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'

class AddObject extends React.Component {
  state = {
    shoppingID:null,
    name:null,
    price:null,
    count:null,
  }

  send = () => {
    let payload = {shoppingID: this.state.shoppingID, name: this.state.name, price: this.state.price, count: this.state.count} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createObject", {
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
            <Col componentClass={ControlLabel} sm={4}>ID Zakupów</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.shoppingID} onChange={this.handleInput.bind(null,"shoppingID")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Nazwa przedmiotu</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.name} onChange={this.handleInput.bind(null,"name")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Cena przedmiotu</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.price} onChange={this.handleInput.bind(null,"price")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Ilość przedmiotów</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.count} onChange={this.handleInput.bind(null,"count")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj Przedmiot!</Button>
      </Form>
    )
  }
}

class ObjectTable extends React.Component {
  render() {
    let rows = this.props.data.map((wydatki, i) => {
      return(
        <tr key={i}>
          <td>{wydatki[0]}</td>
          <td>{wydatki[1]}</td>
          <td>{wydatki[2]}</td>
          <td>{wydatki[3]}</td>
          <td>{wydatki[4]}</td>
        </tr>)
    })
    return(
      <Table bordered condensed hover style={{width: "70%"}}>
        <thead>
          <tr>
            <th>ID_Przedmiotu</th>
            <th>ID_Zakupów</th>
            <th>Nazwa przedmiotu</th>
            <th>Cena</th>
            <th>Ilość</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}


class Thing extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {wydatki: [{id: 1, name: "Ala"},
                     {id: 2, name: "Ola"}]}

  askForObject = () => {
    let userListURL = "http://127.0.0.1:5000/przedmiot"
    console.log("Ask for data", userListURL)
    fetch(userListURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json:', json)
      this.setState({wydatki: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  componentDidMount() {
    console.log('Component DID MOUNT!')
    this.askForObject()
  }

  render = () => {
    return (
      <div>
        <ContentHeader header="Przedmioty dostępne w bazie"></ContentHeader>
        <Content>
          <ObjectTable data={this.state.wydatki} />
          <AddObject refresh={this.askForObject} />
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(Thing)
