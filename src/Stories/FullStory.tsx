import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { StateInterface, Story } from '../types';
import { SingleComment } from './SingleComment';

interface PropsFromState {
    currentStory: Story;
}

interface FullStoryProps extends PropsFromState {
    currentStory: Story
}

class FullStory extends React.Component<FullStoryProps & RouteComponentProps> {
    handleClick = () => {
        this.props.history.push("/mainpage");
    }
    render() {
        let commentsList
        if (this.props.currentStory.kids) {
            commentsList = this.props.currentStory.kids.map((kid, index) =>
                <SingleComment key={index.toString()}
                    kid={kid} />
            )
        } else {
            commentsList = "No comments here."
        }
        return (
            <div className="card" style={{ marginTop: "50%" }
            }>
                <div className="card-header" style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <button className="btn btn-outline-secondary" onClick={() => this.handleClick()}>back</button>
                    </div>
                    <h5>Author: {this.props.currentStory.by}</h5>
                </div>
                <div className="card-body" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <h5 className="card-header" style={{
                        minWidth: "100%",
                        textAlign: "center"}}>
                        <a href={this.props.currentStory.url} >{this.props.currentStory.title}</a>
                    </h5>
                    <div style={{ marginTop: "12px", marginBottom: "12px", width: "300px" }} className="card">{commentsList}</div>
                </div>
                <div className="card-footer" style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <h5>Score: {this.props.currentStory.score}</h5> {this.props.currentStory.time && new Date(this.props.currentStory.time * 1000).toLocaleString("ru-RU")}
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({ currentStory: state.currentStory })


export default connect(mapStateToProps)(FullStory);

