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

    getStories() {
        const promises = this.props.newStoriesIds.map(id => (
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(response => response.json())
                .then((data) => {
                    return data
                })
        ))
        // store.dispatch(setNewStories(allStories))
                return Promise.all(promises)
    }

    setNewStories() {
        this.getNewStoriesIds()
            .then((data) => {
                const hundredStories = data.slice(0, 101)
                store.dispatch(setNewStoriesIds(hundredStories))
            })
            .then( async () => {
                const allStories = await this.getStories()
                store.dispatch(setNewStories(allStories))
                console.log(allStories)
            })
    }

    componentDidMount() {
        this.setNewStories()
        // this.setStoriesList()
        this.interval = setInterval(() => this.setNewStories(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


    render() {
        this.storiesList = this.props.newStories.map((story, index) =>
        <SingleStory key={index.toString()}
            story={story} isStoryOpen={this.props.isStoryOpen} />
    )
        return (
            <>
                <button
                    className="btn btn-outline-secondary btn-lg btn-block"
                    style={{ marginBottom: '12px', marginTop: '12px' }}
                    onClick={() => {
                        console.log(this.props.newStories)
                    }} // TODO: button to up to date new stories list
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