import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'

class AddFamily extends React.Component {
  state = {
    surname: null,
    password:null,
    login:null
  }

  send = () => {
    console.log("Send:", this.state.surname, this.state.userSurname)
    let payload = {surname: this.state.surname, password: this.state.password, login: this.state.login} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createFamily", {
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
            <Col componentClass={ControlLabel} sm={4}>Nazwisko</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.surname} onChange={this.handleInput.bind(null,"surname")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Hasło</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.password} onChange={this.handleInput.bind(null,"password")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Login</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.login} onChange={this.handleInput.bind(null,"login")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj Rodzinę!</Button>
      </Form>
    )
  }
}





class UsersTable extends React.Component {
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
                   <th>Rodzina_ID</th>
                   <th>Nazwisko</th>
                   <th>Hasło</th>
                   <th>Login</th>
                 </tr>
               </thead>
               <tbody>
                 {rows}
               </tbody>
             </Table>
    )
  }
}


class Users extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {users: [{id: 1, name: "Ala"},
                   {id: 2, name: "Ola"}]}

  askForUsers = () => {
    let userListURL = "http://127.0.0.1:5000/rodzina"
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
    this.askForUsers()
  }


  render = () => {
    return (
      <div>
        <ContentHeader header="Rodziny dostępne w bazie"></ContentHeader>
        <Content>
          <UsersTable data={this.state.users} />
          <AddFamily refresh={this.askForUsers}/>
        </Content>
      </div>
    )
  }
}

export default connect(
  reducers.mapStateToProps,
)(Users)
