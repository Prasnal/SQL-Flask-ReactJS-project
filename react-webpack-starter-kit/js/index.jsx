import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'

require("bootstrap-webpack")
// smart components
import SubPage from './subpage.jsx'
import Home from './home.jsx'

import {Router, Route, IndexRoute, browserHistory,} from 'react-router'

import {AdminLteWrapper,Header,ContentWrapper, Sidebar,SidebarHeader,SidebarElement} from './adminlte.jsx'

import {createStore,} from './dev-tools.jsx'
import * as reducers from './reducers.jsx'


const store = createStore(reducers.theReducer)

export class App extends React.Component {
  wsConnect = () => {
    // let ws = new WebSocket(config.WS_URI) // no websockets for now.
    console.log("Foo");
    store.dispatch({type: 'sample',
                    data: "Some data"})
  }

  constructor(props) {
    super(props)
    // One entry point for websockets
    this.wsConnect();
  }

  render() {
    return (
      <AdminLteWrapper>
        <Header></Header>
        <Sidebar>
          <SidebarHeader name="MAIN NAVIGATION"></SidebarHeader>
          <SidebarElement icon="fa ion-home" link="/">Home</SidebarElement>
          <SidebarElement icon="fa ion-alert-circled" link="/subpage">Subpage</SidebarElement>
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
        <Route path="/subpage" component={SubPage}/>
        <Route path="/subpage/:id" component={SubPage}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(appRoutes, document.getElementById('app'))
