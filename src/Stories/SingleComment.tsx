import React from "react";
import { StoryState } from "./SingleStory";

// interface SingleCommentState {
//     commentNumber: string;
//     childrenCommentsNumbers: Array<string>;
// }

export interface SingleCommentProps {
    kid: number;
    key: string;
}

export class SingleComment extends React.Component<SingleCommentProps> {
    state = {
        isOpen: false,
        commentNumber: this.props.kid,
        childrenCommentsNumbers: [],
        by: "",
        id: "",
        kids: [],
        parent: "",
        text: "",
        time: "",
        type: ""
    }

    getSingleComment() {
        let comment = fetch(`https://hacker-news.firebaseio.com/v0/item/${this.state.commentNumber}.json?print=pretty`)
            .then(response => response.json())
            .then((data) => data)
        return comment
    }

    componentDidMount() {
        this.getSingleComment()
            .then((data) => {
                this.setState({
                    by: data.by,
                    id: data.id,
                    kids: data.kids,
                    parent: data.parent,
                    text: data.text,
                    time: data.time,
                    type: data.type,
                })
                console.log(this.state)
            })
    }

    render() {
        return (
            <>
                <div>
                    <h6 className="border-bottom" style={{fontSize: "12px"}}>{this.state.text}</h6>
                </div>
            </>
        )
    }
}