import * as React from 'react';
import { connect } from 'react-redux';
import { StateInterface, Story } from '../types';
import { SingleStory } from '../Stories/SingleStory';
import Action from '../types';
import updateButton from "./update.png"
import setNewStories from '../store/actionCreators/setNewStories';
import store from '../store/store';
import setNewStoriesIds from '../store/actionCreators/setNewStoriesIds';


interface PropsFromState {
    newStoriesIds: Array<string>
    newStories: Array<Story>
    isStoryOpen: boolean
}

interface MainPageProps extends PropsFromState {
    dispatch: (action: Action<any>) => void
}

export class MainPage extends React.Component<MainPageProps> {
    interval!: NodeJS.Timer;
    storiesList!: JSX.Element[]
    updateButtonUrl = updateButton

    getNewStoriesIds() {
        const data = fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            return data
      }
    // getNewStories(id){

    // }

      setNewStories() {
        this.getNewStoriesIds()
        .then((data) => {
          const hundredStories = data.slice(0, 99)
          store.dispatch(setNewStoriesIds(hundredStories))
        })
        .then(() => {
            let allStories: any = []
            this.props.newStoriesIds.forEach(id => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then(response => response.json())
                    .then((data) => {
                        allStories.push(data)
                    })
                    console.log(allStories)
            })
            store.dispatch(setNewStories(allStories))
        })
      }
    

    // getAllStories = () => {
    //     let allStories: Array<Story> = []
    //     this.props.newStoriesIds.forEach(id => {
    //         fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    //             .then(response => response.json())
    //             .then((data) => allStories.push(data))
    //     })
    //     store.dispatch(setNewStories(allStories))
    //     // console.log(this.props)
    // }
    
    componentDidMount() {
        this.setNewStories()
        this.storiesList = this.props.newStories.map((story, index) =>
        <SingleStory key={index.toString()}
            story={story} isStoryOpen={this.props.isStoryOpen} />
    )
        // this.getAllStories()
        this.interval = setInterval(() => {
            this.setNewStories()
            this.storiesList = this.props.newStories.map((story, index) =>
        <SingleStory key={index.toString()}
            story={story} isStoryOpen={this.props.isStoryOpen} />
    )}
        , 60000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }


    render() {
        return (
            <>
                <button
                    className="btn btn-outline-secondary btn-lg btn-block"
                    style={{ marginBottom: '12px', marginTop: '12px' }}
                    onClick={() => ""} // TODO: button to up to date new stories list
                >Refresh</button>
                {this.storiesList}
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    newStoriesIds: state.newStoriesIds,
    newStories: state.newStories,
    isStoryOpen: state.isStoryOpen
})

export default connect(mapStateToProps)(MainPage);