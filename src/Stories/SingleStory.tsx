import React from "react";
import getAppInstance, { AppState } from "../AppState";

interface StoryState {
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
                console.log(this.state)
            })
    }

    render() {
        return (
            <>
                <div>
                    <div>
                        <h5>{this.state.score}</h5><h5>{this.state.by}</h5>
                    </div>
                    <div>
                        <h5>{this.state.title}</h5>
                    </div>
                    <div>
                        {new Date(this.state.time * 1000).toLocaleString("ru-RU")}
                    </div>
                </div>
            </>
        )
    }
}
