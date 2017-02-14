import React from 'react'
require("bootstrap-webpack")

import * as reducers from './reducers.jsx'
import {connect} from 'react-redux'
import {ContentHeader,Content} from './adminlte.jsx'
import {Table, Input, Label, Button, Row, Grid,Form, FormGroup, FormControl, ControlLabel, Col,} from 'react-bootstrap'
import {MyDonutChart} from './components.jsx'

class OutGo extends React.Component{
  state = {x: 1}

  render(){
    console.log('Wydatek2:', this.props.data)
    let rows2=(this.props.data || []).map((outGo, i) => {
      return(
        <tr key={i}>
          <td>{outGo[0]}</td>
          <td>{outGo[1]}</td>
          <td>{outGo[2]}</td>
          <td>{outGo[3]}</td>
          <td>{outGo[4]}</td>
          <td>{outGo[5]}</td>
        </tr>)
    })
    let getData5 = this.props.getData5
    console.log("getData5:", getData5)
    return(
      <div className="box-body">

        <table id="example2" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th onClick={() => {getData5("1","Uzytkownik.Imie")}}>Imię</th>
              <th onClick={() => {getData5("1","Uzytkownik.Nazwisko")}}>Nazwisko</th>
              <th  onClick={() => {getData5("1","Przedmiot.Nazwa")}}>Nazwa produktu</th>
              <th  onClick={() => {getData5("1","Przedmiot.Cena")}}>Kwota</th>
              <th  onClick={() => {getData5("1","Sklep.Nazwa")}}>Sklep</th>
              <th  onClick={() => {getData5("1","Tag.Tag_name")}}>Tag</th>
            </tr>
          </thead>
          <tbody>
             {rows2}
          </tbody>
        </table>
      </div>

      )
    }
}


class Warranty extends React.Component{
  state = {x: 1}

  render(){
    let rows3=(this.props.data || []).map((warranty, i) => {
      {console.log('Wydatek:',warranty[0])}
      return(
        <tr key={i}>
          <td>{warranty[0]}</td>
          <td>{warranty[1]}</td>
          <td>{warranty[2]}</td>
        </tr>)
    })
    let getData = this.props.getData
    // console.log("getData3:", getData)
    return(
      <div className="box-body">



          <table id="example2" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th onClick={() => {getData()}}>Nazwa przedmiotu</th>
                <th onClick={() => {getData()}}>Data zakupu</th>
                <th onClick={() => {getData()}}>Data końca gwarancji</th>
              </tr>
            </thead>
            <tbody>
               {rows3}
            </tbody>
          </table>
        </div>
      )
  }
}



class Users2 extends React.Component {


  render() {
    let rows = this.props.data.map((user, i) => {
      {console.log('uzyt:', user[3])}
    return(
      <tr key={i}>
        <td>{user[0]}</td>
        <td>{user[1]}</td>
        <td>{user[2]}</td>
        <td>{user[3]}</td>
        <td>{user[4]}</td>
      </tr>)

    })

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className="active"><a href="#tab_1" data-toggle="tab">Tabela Użytkowników</a></li>
                <li ><a href="#tab_2" data-toggle="tab" >Tabela wydatków</a></li>
                <li><a href="#tab_3" data-toggle="tab" >Tabela gwarancji</a></li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="tab_1">

                  <div className="box-body">
                    <table id="example2" className="table table-bordered table-hover" >
                      <thead>
                        <tr>
                          <th onClick={() => {this.props.getData4("Uzytkownik_ID")}}>Użytkownik_ID</th>
                          <th onClick={() => {this.props.getData4("Nazwisko")}}>Nazwisko</th>
                          <th onClick={() => {this.props.getData4("Imie")}}>Imię</th>
                          <th onClick={() => {this.props.getData4("Nick")}}>Nick</th>
                          <th onClick={() => {this.props.getData4("Mail")}}>Mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="tab-pane" id="tab_2">
                  <OutGo data={this.props.data2} getData5={this.props.getData5}/>
                </div>
                <div className="tab-pane" id="tab_3">
                  <Warranty data={this.props.data3} getData={this.props.getData3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



class Home extends React.Component {
  // data to start with, askForUsers function should fill this with real data in the same format.
  state = {users: [{id: 1, name: "Ala"},
                   {id: 2, name: "Ola"}],
           outGo: [{id:1}],
           warranty:[{id: 1}],
           decreasingSort: true,
           decreasingSort2: true,
           decreasingSort3: true,
           donutChartData: [],
  }


  askForchartData = () => {

    let userListURL = "http://127.0.0.1:5000/wykresjednorazowe"
    console.log("Ask for data", userListURL)
    fetch(userListURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed jsonTU:', json)
      this.setState({donutChartData: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }


  askForUsers = () => {
    let userListURL = "http://127.0.0.1:5000/usr/Uzytkownik_ID/A"
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

  askForOutGo = () => {
    let OutGoListURL = "http://127.0.0.1:5000/wydatki/1/Uzytkownik.Uzytkownik_ID/Z"
    console.log("Ask for data2", OutGoListURL)
    fetch(OutGoListURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json2:', json)
      this.setState({outGo: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }



  askForWarranty = () => {
    let WarrantyURL = "http://127.0.0.1:5000/gwarancje/1/Gwarancja.Data_Zakupu/Z"
    console.log("Ask for data3", WarrantyURL)
    fetch(WarrantyURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json3:', json)
      this.setState({warranty: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }



  askForUsers2 = (sort) => {
    let order = this.state.decreasingSort2 ? "A" : "Z"
    let userListURL = "http://127.0.0.1:5000/usr/"+sort+"/"+order
    console.log("Ask for data", userListURL)
    this.setState({decreasingSort2: !this.state.decreasingSort2})
    fetch(userListURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json:', json)
      this.setState({users: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }



  askForWarranty2 = (RodzinaID,sort) => {
    let order = this.state.decreasingSort ? "Z" : "A"
    let WarrantyURL = "http://127.0.0.1:5000/gwarancje/" + RodzinaID + "/" + sort + "/" + order
    console.log("Ask for data3", RodzinaID, WarrantyURL)
    this.setState({decreasingSort: !this.state.decreasingSort})
    fetch(WarrantyURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json3:', json)
      this.setState({warranty: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  askForOutGo2 = (RodzinaID,sort) => {
    let order = this.state.decreasingSort3 ? "A" : "Z"
    let OutGoListURL = "http://127.0.0.1:5000/wydatki/"+RodzinaID+"/"+sort+"/"+order
    console.log("Ask for data2", OutGoListURL)
    this.setState({decreasingSort3: !this.state.decreasingSort3})
    fetch(OutGoListURL).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json2:', json)
      this.setState({outGo: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }




  componentDidMount() {
    console.log('Component DID MOUNT!')
    this.askForUsers()
    this.askForWarranty()
    this.askForWarranty2()
    this.askForOutGo()
    this.askForOutGo2()
    this.askForchartData()

  }

  render = () => {
    console.log("x2",this.state.donutChartData)
    return (
        <div>
          <ContentHeader header="Tabele informacyjne"></ContentHeader>
          <Content>
            <Users2 data={this.state.users} data2={this.state.outGo} data3={this.state.warranty} getData={this.askForUsers} getData2={this.askForOutGo} getData3={this.askForWarranty} getData4={this.askForUsers2}  getData5={this.askForOutGo2} />
            <MyDonutChart data={this.state.donutChartData} />
          </Content>
        </div>

    )
  }
}




export default connect(
  reducers.mapStateToProps,
)(Home)
