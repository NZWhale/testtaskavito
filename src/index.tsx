import React from 'react';
import { render} from "react-dom"
import MainPage from './MainPage/MainPage'
import FullStory from './Stories/FullStory';
import 'bootstrap/dist/css/bootstrap.css';

export default interface State {
  isStoryOpen: boolean,
  newStories: Array<string>,
  currentStory: Object
}

class App extends React.Component {
  interval!: NodeJS.Timer;
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

  setNewStories() {
    this.getNewStories()
    .then((data) => {
      this.setState({newStories: data.slice(0, 99)})
    })
  }

  componentDidMount() {
    this.setNewStories()
    this.interval = setInterval(() => this.setNewStories(), 60000)
  }
  componentWillMount() {
    clearInterval(this.interval)
  }
  
  render() {
    return (
      <>
        <MainPage state={this.state} update={() => this.setNewStories()}/>
        {this.state.isStoryOpen &&
          <FullStory state={this.state} />
        }
      </>
    )
  }
}


render(<App />, document.getElementById("root"))