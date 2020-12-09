import * as React from 'react';
import { connect } from 'react-redux';
import { StateInterface, Story } from '../types';
import { SingleStory } from '../Stories/SingleStory';
import Action from '../types';
import updateButton from "./update.png"
import setNewStories from '../store/actionCreators/setNewStories';
import store from '../store/store';
import setNewStoriesIds from '../store/actionCreators/setNewStoriesIds';
import { RouteComponentProps } from 'react-router-dom';
import setLoadStatus from '../store/actionCreators/setLoadStatus';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'




interface PropsFromState {
    newStoriesIds: Array<string>
    newStories: Array<Story>
    isStoryOpen: boolean
    isContentLoaded: boolean
}

interface MainPageProps extends PropsFromState {
    dispatch: (action: Action<any>) => void
}

export class MainPage extends React.Component<MainPageProps & RouteComponentProps> {
    interval!: NodeJS.Timer;
    updateButtonUrl = updateButton

    getNewStoriesIds() {
        const data = fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }

    getStories() {
        const promises = this.props.newStoriesIds.map(id => (
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(response => response.json())
                .then((data) => {
                    return data
                })
        ))
        return Promise.all(promises)
    }

    setNewStories() {
        this.getNewStoriesIds()
            .then((data) => {
                const hundredStories = data.slice(0, 101)
                store.dispatch(setNewStoriesIds(hundredStories))
            })
            .then(async () => {
                const allStories = await this.getStories()
                store.dispatch(setNewStories(allStories))
                store.dispatch(setLoadStatus(true))
                console.log(this.props.isContentLoaded)
            })
    }

    updateStories() {
        this.getNewStoriesIds()
            .then((data) => {
                const hundredStories = data.slice(0, 101)
                store.dispatch(setNewStoriesIds(hundredStories))
            })
            .then(async () => {
                const allStories = await this.getStories()
                store.dispatch(setNewStories(allStories))
            })
    }

    componentDidMount() {
        this.setNewStories()
        this.interval = setInterval(() => this.updateStories(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


    render() {
        const storiesList = this.props.newStories.filter((story) => {
            if(story === null) {
                return false
            }
            return true
        }).map((story, index) =>
            <SingleStory history={this.props.history} location={this.props.location} match={this.props.match} key={index.toString()}
                story={story} isStoryOpen={this.props.isStoryOpen} />
                )
        return (
            <>
                <Loader style={{marginTop: "50%", marginLeft: "40%"}}
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    visible={this.props.isContentLoaded?false:true}
                />
                { this.props.isContentLoaded &&
            <>
                <button
                    className="btn btn-outline-secondary btn-lg btn-block"
                    style={{ marginBottom: '12px', marginTop: '12px' }}
                    onClick={() => this.setNewStories()}
                >Refresh</button>
                {storiesList}
            </>
            }
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    newStoriesIds: state.newStoriesIds,
    newStories: state.newStories,
    isStoryOpen: state.isStoryOpen,
    isContentLoaded: state.isContentLoaded,
})

export default connect(mapStateToProps)(MainPage);