import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'


class AddWarranty extends React.Component {
  state = {
    userID:null,
    year:null,
    mounth:null,
    day:null,
    year2:null,
    mounth2:null,
    day2:null,
  }

  send = () => {
    let payload = {userID: this.state.userID, year: this.state.year, mounth: this.state.mounth, day: this.state.day, year2:this.state.day2, mounth2:this.state.mounth2, day2:this.state.day2} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createWarranty", {
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
            <Col componentClass={ControlLabel} sm={4}>ID Przedmiotu</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.userID} onChange={this.handleInput.bind(null,"userID")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Rok kupna</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.year} onChange={this.handleInput.bind(null,"year")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Miesiąć kupna</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.mounth} onChange={this.handleInput.bind(null,"mounth")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Dzień kupna</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.day} onChange={this.handleInput.bind(null,"day")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Rok końca gwarancji</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.year2} onChange={this.handleInput.bind(null,"year2")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Miesiąc końca gwarancji</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.mounth2} onChange={this.handleInput.bind(null,"mounth2")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Dzień końca gwarancji</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.day2} onChange={this.handleInput.bind(null,"day2")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj Gwarancję!</Button>
      </Form>
    )
  }
}

class WarrantyTable extends React.Component {
  render() {
    let rows = this.props.data.map((wydatki, i) => {
      return(
        <tr key={i}>
          <td>{wydatki[0]}</td>
          <td>{wydatki[1]}</td>
          <td>{wydatki[2]}</td>
          <td>{wydatki[3]}</td>

        </tr>)
    })
    return(
      <Table bordered condensed hover style={{width: "70%"}}>
        <thead>
          <tr>
            <th>Gwarancja_ID</th>
            <th>Przedmiot_ID</th>
            <th>Data początku gwarancji</th>
            <th>Data końca gwarancji</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}


class Warranty extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {wydatki: [{id: 1, name: "Ala"},
                     {id: 2, name: "Ola"}]}

  askForWarranty = () => {
    let userListURL = "http://127.0.0.1:5000/gwarancja"
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
    this.askForWarranty()
  }


  render = () => {
    return (
      <div>
        <ContentHeader header="Gwarancje dostępne w bazie"></ContentHeader>
        <Content>
          <WarrantyTable data={this.state.wydatki} />
          <AddWarranty refresh={this.askForWarranty} />
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(Warranty)
