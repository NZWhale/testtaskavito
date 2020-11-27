import React from 'react';
import MainPage from './MainPage/MainPage'

class App extends React.Component {
  state = {
    isStoryOpen: false,
    newStories: [],
    currentStorie: {}
  }

  render() {

    return (
      <>
        <MainPage state={this.state} />
        {this.state.isStoryOpen &&
          <Story state={this.state} />
        }
      </>
    )
  }
}