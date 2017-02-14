import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'


class AddOutGo extends React.Component {
  state = {
    familyID:null,
    price:null,
    name:null,
    year:null,
    mounth:null,
    day:null
  }

  send = () => {
    let payload = {familyID: this.state.familyID, price: this.state.price, name: this.state.name, year: this.state.year, mounth:this.state.mounth, day:this.state.day} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createOutGo", {
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
            <Col componentClass={ControlLabel} sm={4}>ID Rodziny</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.familyID} onChange={this.handleInput.bind(null,"familyID")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Cena wydatku</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.price} onChange={this.handleInput.bind(null,"price")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Nazwa Wydatku</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.name} onChange={this.handleInput.bind(null,"name")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Rok załpaty</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.year} onChange={this.handleInput.bind(null,"year")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Miesiąc załpaty</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.mounth} onChange={this.handleInput.bind(null,"mounth")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Dzień załpaty</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.day} onChange={this.handleInput.bind(null,"day")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj Wydatek</Button>
      </Form>
    )
  }
}

class OutGoTable extends React.Component {
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
            <th>Wydatek_ID</th>
            <th>Rodzina_ID</th>
            <th>Cena</th>
            <th>Nazwa wydatku</th>
            <th>Data zapłaty</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}


class OutGo extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {wydatki: [{id: 1, name: "Ala"},
                   {id: 2, name: "Ola"}]}

  askForOutGo = () => {
    let userListURL = "http://127.0.0.1:5000/wydatkij"
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
    this.askForOutGo()
  }


  render = () => {
    return (
      <div>
        <ContentHeader header="Wydatki jednorazowe dostępne w bazie"></ContentHeader>
        <Content>
          <OutGoTable data={this.state.wydatki} />
          <AddOutGo refresh={this.askForOutGo}/>
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(OutGo)
