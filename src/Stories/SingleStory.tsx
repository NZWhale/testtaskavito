import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import FullStory from "./FullStory";

export interface StoryState {
    isFullStoryOpen: boolean;
    by: string,
    descendants: number,
    id: number,
    kids: Array<number>,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

interface StoryProps {
    story: string
    
}

export class SingleStory extends React.Component<StoryProps> {
    state: StoryState = {
        isFullStoryOpen: false,
        by: "",
        descendants: 0,
        id: 0,
        kids: [],
        score: 0,
        time: 0,
        title: "",
        type: "",
        url: ""
    }

    getSingleStory(storyNumber: string) {
        let story = fetch(`https://hacker-news.firebaseio.com/v0/item/${storyNumber}.json?print=pretty`)
            .then(response => response.json())
            .then((data) => data)
        return story
    }

    componentDidMount() {
        this.getSingleStory(this.props.story)
            .then((data) => {
                this.setState({
                    by: data.by,
                    descendants: data.descendants,
                    id: data.id,
                    kids: data.kids,
                    score: data.score,
                    time: data.time,
                    title: data.title,
                    type: data.type,
                    url: data.url,
                })
            })
    }

    render() {
        return (
            <>
                <div className="card" style={{ marginBottom: "20px" }} onClick={() => this.setState({isFullStoryOpen: true})}>
                    <div className="card-header" style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <h5>Author: {this.state.by}</h5>
                    </div>
                    <div className="card-body">
                        <h5>{this.state.title}</h5>
                    </div>
                    <div className="card-footer" style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                       <h5>Score: {this.state.score}</h5> {new Date(this.state.time * 1000).toLocaleString("ru-RU")}
                    </div>
                </div>
                {this.state.isFullStoryOpen &&
                <>
                <FullStory state={this.state}/>
                </>
                }
            </>
        )
    }
}
