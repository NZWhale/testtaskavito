import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Action, { StateInterface, Story } from "../types";
import setIsStoryOpen from "../store/actionCreators/setStoryIsOpen";
import store from "../store/store";
import setCurrentStory from "../store/actionCreators/setCurrentStory";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";


interface StoryProps extends RouteComponentProps{
    story: Story,
    isStoryOpen: boolean
}

export class SingleStory extends React.Component<StoryProps> {


    handleClick = () => {
        this.props.history.push("/fullstory");
    }
    render() {
        return (
            <>
                <div className="card" style={{ marginBottom: "20px", cursor:"pointer" }} onClick={() => {
                    store.dispatch(setIsStoryOpen(true))
                    store.dispatch(setCurrentStory(this.props.story))
                    this.handleClick()
                }}>
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


export default withRouter(SingleStory);
