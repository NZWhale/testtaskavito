import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import setCurrentComments from '../store/actionCreators/setCurrentComments';
import store from '../store/store';
import { Comment_, StateInterface, Story } from '../types';
import { SingleComment } from './SingleComment';

interface PropsFromState {
    currentStory: Story;
    currentComments: Array<Comment_> | null
}

interface FullStoryProps extends PropsFromState {
    currentStory: Story
}

class FullStory extends React.Component<FullStoryProps & RouteComponentProps> {
    timer!: NodeJS.Timer

    handleClick = () => {
        this.props.history.push("/mainpage");
    }


    getCommentsList() {
        if (this.props.currentStory.kids) {
            const promises = this.props.currentStory.kids.map(id => (
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then(response => response.json())
                    .then((data) => {
                        return data
                    })
            ))
            return Promise.all(promises)
        } else {
            return null
        }
    }

    setCurrentComments() {
        const set = async () => {
            const commentsList: Array<Comment> | null = await this.getCommentsList()
            store.dispatch(setCurrentComments(commentsList))

        }
        set()
    }

    componentDidMount() {
        this.setCurrentComments()
        this.timer = setInterval(() => this.setCurrentComments(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const updateButton =
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </svg>

        let commentsList
        if (this.props.currentComments !== null) {
            commentsList = this.props.currentComments.map((comment, index) =>
                <SingleComment key={index.toString()}
                    comment={comment} />
            )
        } else {
            commentsList = "No comments here."
        }
        return (
            <div className="card">
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
                    <div style={{ cursor: "pointer" }}
                        onClick={() => {
                            this.setCurrentComments()
                            alert("Comments updated")
                        }}>
                        {updateButton}
                    </div>
                </div>
                <div className="card-body" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <h5 className="card-header" style={{
                        width: "100%",
                        textAlign: "center"
                    }}>
                        <a href={this.props.currentStory.url} target="_blank">{this.props.currentStory.title}</a>
                    </h5>
                    <div style={{
                        marginTop: "12px",
                        marginBottom: "12px",
                        width: "100%",
                        textAlign: "center"
                    }} >
                        {commentsList}
                    </div>
                </div>
                <div className="card-footer" style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <h5>Comments: {this.props.currentStory.kids ? this.props.currentStory.kids.length : 0}</h5> {this.props.currentStory.time && new Date(this.props.currentStory.time * 1000).toLocaleString("ru-RU")}
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    currentStory: state.currentStory,
    currentComments: state.currentComments,
})


export default connect(mapStateToProps)(FullStory);

