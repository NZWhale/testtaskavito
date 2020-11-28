import * as React from 'react';
import State from '..';

interface StoryProps {
    state: State
}

export default class FullStory extends React.Component<StoryProps> {
    render() {
        return (
            <div>
                <div className="card-header">
                    <button></button>
                    <div>Author</div>
                </div>
                <div className="card-body">
                    <div>News Header</div>
                    <div>Cooments</div>
                </div>
                <div className="card-footer">date</div>
            </div>
        )
    }
}