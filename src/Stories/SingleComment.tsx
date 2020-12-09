import React from "react";
import Loader from "react-loader-spinner";
import { Comment_ } from "../types";
import DOMPurify from 'dompurify';
import store from "../store/store";
import setCurrentComments from "../store/actionCreators/setCurrentComments";



export interface SingleCommentProps {
    comment: Comment_;
}

export class SingleComment extends React.Component<SingleCommentProps> {
    state = {
        isClicked: false,
        kidsComments: [],
    }

    getCommentsList() {
        if (this.props.comment.kids) {
            const promises = this.props.comment.kids.map(id => (
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
            this.setState({ kidsComments: commentsList })
        }
        set()
    }

    changeState() {
        this.setState({ isClicked: !this.state.isClicked })
    }

    componentDidMount() {
        this.setCurrentComments()
    }

    render() {
        const closeButton =
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-double-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z" />
                <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
        const openButton =
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-double-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
        const sanitizer = DOMPurify.sanitize;
        let commentsList
        if (this.state.kidsComments !== null) {
            commentsList = this.state.kidsComments.filter((comment: Comment_) => {
                if (comment.deleted == true) {
                    return false;
                } else {
                    return true
                }
            }).map((comment, index) =>
                <SingleComment key={index.toString()}
                    comment={comment} />
            )
        } else {
            commentsList = "No comments here."
        }
        return (
            <>
                <div className="card" style={{ marginBottom: "12px", boxShadow: "1px 3px 1px #9E9E9E", marginRight: "5px" }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: "12px", 
                        padding: "5px"
                    }}>By: {this.props.comment.by}</div>
                    <div style={{ fontSize: "12px", padding:"5px" }} dangerouslySetInnerHTML={{ __html: sanitizer(this.props.comment.text) }}></div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "12px",
                    }}>
                        <div>{this.props.comment.time && new Date(this.props.comment.time * 1000).toLocaleString("ru-RU")}</div>
                        <div onClick={() => this.changeState()} style={{ cursor: "pointer" }}>
                            {`comments: ${this.props.comment.kids ? this.props.comment.kids.length : 0}`}{openButton}
                        </div>
                    </div>
                    {this.state.isClicked &&
                        <div style={{ marginLeft: "20px" }}>
                            <div onClick={() => {
                                this.changeState()
                            }}
                                style={{ cursor: "pointer", marginBottom:"12px" }}>
                                Close {closeButton}
                            </div>
                            {commentsList}
                        </div>
                    }
                </div>
            </>
        )
    }
}