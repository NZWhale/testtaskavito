import * as React from 'react';
import State from '..';
import { SingleStory } from '../Stories/SingleStory';


interface MainPageProps {
    state: State
}

export default class MainPage extends React.Component<MainPageProps> {

    render() {
        const storiesList = this.props.state.newStories.map((story, index) =>
            <SingleStory key={index.toString()}
                story={story} />
        )
        return (
            <>
            {storiesList}
            </>
        )
    }
}