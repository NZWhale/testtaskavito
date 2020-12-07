import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import FullStory from "./FullStory";
import { connect } from "react-redux";
import Action, { StateInterface, Story } from "../types";


interface StoryProps {
    story: Story,
    isStoryOpen: boolean
}

export class SingleStory extends React.Component<StoryProps> {
    render() {
        return (
            <>
                <div className="card" style={{ marginBottom: "20px" }} onClick={() => this.setState({isFullStoryOpen: true})}>
                    <div className="card-header" style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <h5>Author: {this.props.story.by}</h5>
                    </div>
                    <div className="card-body">
                        <h5>{this.props.story.title}</h5>
                    </div>
                    <div className="card-footer" style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                       <h5>Score: {this.props.story.score}</h5> {this.props.story.time && new Date(this.props.story.time * 1000).toLocaleString("ru-RU")}
                    </div>
                </div>
            
            </>
        )
    }
}


