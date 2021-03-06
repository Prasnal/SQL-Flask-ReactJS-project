import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import * as utils from './utils.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,Radio,} from 'react-bootstrap'


class AddUser extends React.Component {
  state = {familyID: null,
           surname: null,
           name: null,
           email:null,
           isAdmin:null,
           nick:null,
           password:null
  }

  send = () => {
    console.log("Send:", this.state.userName, this.state.userSurname)
    let payload = {familyID: this.state.familyID, surname: this.state.surname, name: this.state.name, email:this.state.email, isAdmin: this.state.isAdmin, nick: this.state.nick, password: this.state.password} // data in the format required by Python function.
    let data = new FormData();
    data.append( "json", JSON.stringify(payload))
    fetch("http://127.0.0.1:5000/createUser", {
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
            <Col componentClass={ControlLabel} sm={4}>ID rodziny</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.familyID} onChange={this.handleInput.bind(null,"familyID")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Nazwisko</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.surname} onChange={this.handleInput.bind(null,"surname")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Imię</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.name} onChange={this.handleInput.bind(null,"name")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>E-mail</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.email} onChange={this.handleInput.bind(null,"email")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Czy admin?</Col>
             <Col sm={6}><FormControl type="text" value={this.state.isAdmin} onChange={this.handleInput.bind(null,"isAdmin")}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Tak</Col>
            <Col sm={6}><Radio type="radio" name="Tak" value="true" onChange={this.handleInput.bind(null,"isAdmin")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
              <Col componentClass={ControlLabel} sm={4}>Nie</Col>
              <Col sm={6}><Radio type="radio" name="Nie" value="false" onChange={this.handleInput.bind(null,"isAdmin")}/>
            </Col>
          </FormGroup>


          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Nick</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.nick} onChange={this.handleInput.bind(null,"nick")}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formScenario">
            <Col componentClass={ControlLabel} sm={4}>Hasło</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.password} onChange={this.handleInput.bind(null,"password")}/>
            </Col>
          </FormGroup>
        </Grid>
        <Button type="button" onClick={this.send}>Dodaj użytkownika!</Button>
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
          <td>{user[4]}</td>
{ /*          <td>{user[5]}</td> */ }
          <td>{user[6]}</td>
          <td>{user[7]}</td>
        </tr>)
    })
    return (
      <Table bordered condensed hover style={{width: "50%"}}>

        <thead>
          <tr>
            <th>Użytkownik_ID</th>
            <th>Rodzina_ID</th>
            <th>Nazwisko</th>
            <th>Imię</th>
            <th>Mail</th>
            { /* <th>Czy Admin?</th> */ }
            <th>Nick</th>
            <th>Hasło</th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}


class UsersList extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {users: [{id: 1, name: "Ala"},
                   {id: 2, name: "Ola"}]}

  askForUsers = () => {
    let userListURL = utils.makeBackendURL("/uzytkownik")
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
        <ContentHeader header="Lista użytkowników"></ContentHeader>
        <Content>
          <UsersTable data={this.state.users} GetData={this.askForUsers} />
          <AddUser refresh={this.askForUsers}/>
        </Content>
      </div>


    )
  }

}

export default connect(
  reducers.mapStateToProps,
)(UsersList)
