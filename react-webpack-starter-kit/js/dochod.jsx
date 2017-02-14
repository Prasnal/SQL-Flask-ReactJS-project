import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'


class AddIncome extends React.Component {
  state = {
    familyID:null,
    userID:null,
    price:null,
    year:null,
    mounth:null,
    day:null
  }


  send = () => {
    let payload = {familyID: this.state.familyID, userID: this.state.userID, price: this.state.price,  year: this.state.year, mounth:this.state.mounth, day:this.state.day} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createIncome", {
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
            <Col componentClass={ControlLabel} sm={4}>ID Użytkownika</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.userID} onChange={this.handleInput.bind(null,"userID")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Kwota</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.price} onChange={this.handleInput.bind(null,"price")}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Rok przychodu</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.year} onChange={this.handleInput.bind(null,"year")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Miesiąc przychodu</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.mounth} onChange={this.handleInput.bind(null,"mounth")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Dzień przychodu</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.day} onChange={this.handleInput.bind(null,"day")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj Dochód!</Button>
      </Form>
    )
  }
}

class IncomeTable extends React.Component {
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
            <th>Dochód_ID</th>
            <th>Rodzina_ID</th>
            <th>Użytkownik_ID</th>
            <th>Przychód</th>
            <th>Data przychodu</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}


class Income extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {wydatki: [{id: 1, name: "Ala"},
                     {id: 2, name: "Ola"}]}

  askForIncome = () => {
    let userListURL = "http://127.0.0.1:5000/dochod"
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
    this.askForIncome()
  }

  render = () => {

      {this.didClick}

    return (
      <div>
        <ContentHeader header="Dochody dostępne w bazie"></ContentHeader>
        <Content>
          <IncomeTable data={this.state.wydatki} />
          <AddIncome refresh={this.askForIncome}/>
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(Income)
