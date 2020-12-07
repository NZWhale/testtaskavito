import * as React from 'react';
import { render} from "react-dom"
import MainPage from './MainPage/MainPage'

import {Provider} from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';
import store from './store/store';
import setNewStories from './store/actionCreators/setNewStories';
import setNewStoriesIds from './store/actionCreators/setNewStoriesIds';



class App extends React.Component {
  // interval!: NodeJS.Timer;

  // getNewStories() {
  //   const data = fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
  //       .then((response) => response.json())
  //       .then((data) => {
  //           return data
  //       })
  //       return data
  // }

  // setNewStories() {
  //   this.getNewStories()
  //   .then((data) => {
  //     const hundredStories = data.slice(0, 99)
  //     store.dispatch(setNewStoriesIds(hundredStories))
  //   })
  // }

  // componentDidMount() {
  //   this.setNewStories()
  //   this.interval = setInterval(() => this.setNewStories(), 60000)
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval)
  // }
  
  render() {
    return (
      <Provider store={store}>
        <MainPage />
        {/* <MainPage update={() => this.setNewStories()}/> */}
      </Provider>
    )
  }
}


render(<App />, document.getElementById("root"))