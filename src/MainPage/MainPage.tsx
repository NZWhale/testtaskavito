import * as React from 'react';
import { connect } from 'react-redux';
import State from '..';
import { StateInterface } from '../store/initialState';
import { SingleStory } from '../Stories/SingleStory';
import Action from '../types';
import updateButton from "./update.png"


interface PropsFromState {
    newStoriesIds: Array<string>
}

interface MainPageProps extends PropsFromState {
    dispatch: (action: Action<any>) => void
}

export class MainPage extends React.Component<MainPageProps> {
    updateButtonUrl = updateButton
    render() {
        const storiesList = this.props.newStoriesIds.map((story, index) =>
            <SingleStory key={index.toString()}
                story={story} />
        )
        return (
            <>
            <button 
            className="btn btn-outline-secondary btn-lg btn-block" 
            style={{marginBottom: '12px', marginTop: '12px'}}
            onClick={() => ""} // TODO: button to up to date new stories list
            >Refresh</button>
            {storiesList}
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    newStoriesIds: state.newStoriesIds
})

export default connect(mapStateToProps)(MainPage);