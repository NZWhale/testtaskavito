import * as React from 'react';
import { render } from "react-dom"
import MainPage from './MainPage/MainPage'

import { connect, Provider } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { createBrowserHistory } from 'history'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'bootstrap/dist/css/bootstrap.css';
import store from './store/store';
import FullStory from './Stories/FullStory';

interface AppProps {
  isStoryOpen: boolean;
}

//@ts-ignore
window.store = store

class App extends React.Component<AppProps> {
  render() {
    return (

      <Provider store={store}>
        <Switch>
          <Route history={history} path='/mainpage' component={MainPage} />
          <Route history={history} path='/fullstory' component={FullStory} />
          <Redirect from='/' to='/mainpage' />
        </Switch>
      </Provider>
    )
  }
}

const history = createBrowserHistory()

render(
  <Router history={history}>
    <App isStoryOpen={store.getState().isStoryOpen}/>
  </Router>
  , document.getElementById("root"))
