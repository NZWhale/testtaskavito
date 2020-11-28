import * as React from 'react';
import State from '..';
import { SingleStory } from '../Stories/SingleStory';
import updateButton from "./update.png"


interface MainPageProps {
    state: State
    update: () => void
}

export default class MainPage extends React.Component<MainPageProps> {
    updateButtonUrl = updateButton
    render() {
        const storiesList = this.props.state.newStories.map((story, index) =>
            <SingleStory key={index.toString()}
                story={story} />
        )
        return (
            <>
            {/* <div><img src={this.updateButtonUrl} style={{width: '24px'}}/></div> */}
            <button 
            className="btn btn-outline-secondary btn-lg btn-block" 
            style={{marginBottom: '12px', marginTop: '12px'}}
            onClick={() => this.props.update()}
            >Refresh</button>
            {storiesList}
            </>
        )
    }
}