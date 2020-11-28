import React from 'react';
import { render} from "react-dom"
import getAppInstance, { AppState } from './AppState';
import MainPage from './MainPage/MainPage'
import FullStory from './Stories/FullStory';

export default interface State {
  isStoryOpen: boolean,
  newStories: Array<string>,
  currentStory: Object
}

class App extends React.Component {
  state: State = {
    isStoryOpen: false,
    newStories: [],
    currentStory: {}
  }

  getNewStories() {
    const data = fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        return data
  }

  appInstance: AppState = getAppInstance()
  componentDidMount() {
    this.getNewStories()
    .then((data) => {
      this.setState({newStories: data})
    console.log(this.state.newStories)
    })
  }
  
  render() {
    return (
      <>
        <MainPage state={this.state} />
        {this.state.isStoryOpen &&
          <FullStory state={this.state} />
        }
      </>
    )
  }
}


render(<App />, document.getElementById("root"))