import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'

require("bootstrap-webpack")
// smart components
{ /* import SubPage from './subpage.jsx' */ }
import Home from './home.jsx'
import UsersList from './users-list.jsx'
import Users from './users.jsx'
import OutGo from './wydatkij.jsx'
import OutGo2 from './wydatkis.jsx'
import Income from './dochod.jsx'
import Warranty from './gwarancja.jsx'
import Tag from './tag.jsx'
import Shop from './sklep.jsx'
import Shopping from './zakupy.jsx'
import Thing from './przedmiot.jsx'
import {Router, Route, IndexRoute, browserHistory,} from 'react-router'
import {AdminLteWrapper,Header,ContentWrapper, Sidebar,SidebarHeader,SidebarElement} from './adminlte.jsx'
import {createStore,} from './dev-tools.jsx'
import * as reducers from './reducers.jsx'

const store = createStore(reducers.theReducer)

export class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AdminLteWrapper>
        <Header></Header>
        <Sidebar>
          <SidebarHeader name="Panel administratora"></SidebarHeader>
          <SidebarElement icon="fa ion-ios-pie" link="/">Analiza Danych</SidebarElement>
{ /* <SidebarElement icon="fa ion-ios-pie" link="/subpage">Wykresy</SidebarElement> */ }
          <SidebarElement icon="fa" link="/users">Rodziny</SidebarElement>
          <SidebarElement icon="fa" link="/users-list">Użytkownicy</SidebarElement>
          <SidebarElement icon="fa" link="/dochod">Dochód</SidebarElement>
          <SidebarElement icon="fa" link="/wydatkij">Wydatki Jednorazowe</SidebarElement>
          <SidebarElement icon="fa" link="/wydatkis">Wydatki Stałe</SidebarElement>
          <SidebarElement icon="fa" link="/zakupy">Zakupy</SidebarElement>

          <SidebarElement icon="fa" link="/przedmiot">Przedmioty</SidebarElement>
          <SidebarElement icon="fa" link="/gwarancja">Gwarancje</SidebarElement>
          <SidebarElement icon="fa" link="/tag">Tagi</SidebarElement>
          <SidebarElement icon="fa" link="/sklep">Sklepy</SidebarElement>

        </Sidebar>
        <ContentWrapper>
          {this.props.children}
        </ContentWrapper>
      </AdminLteWrapper>
    )
  }
}

let AppWithRedux = connect(
  reducers.mapStateToProps,
)(App)


// all components in routes should be 'smart' - connected to store.
const appRoutes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppWithRedux}>
        <IndexRoute component={Home}/>
        { /*
        <Route path="/subpage" component={SubPage}/>
        <Route path="/subpage/:id" component={SubPage}/>
        */ }
        <Route path="/users-list" component={UsersList}/>
        <Route path="/users" component={Users}/>
        <Route path="/wydatkij" component={OutGo}/>
        <Route path="/wydatkis" component={OutGo2}/>
        <Route path="/dochod" component={Income}/>
        <Route path="/gwarancja" component={Warranty}/>
        <Route path="/tag" component={Tag}/>
        <Route path="/sklep" component={Shop}/>
        <Route path="/zakupy" component={Shopping}/>
        <Route path="/przedmiot" component={Thing}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(appRoutes, document.getElementById('app'))
