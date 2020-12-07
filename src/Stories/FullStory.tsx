import * as React from 'react';
import { SingleComment } from './SingleComment';


export default class FullStory extends React.Component {
    state = {
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

    getSingleStory(storyNumber: number) {
        let story = fetch(`https://hacker-news.firebaseio.com/v0/item/${storyNumber}.json?print=pretty`)
            .then(response => response.json())
            .then((data) => data)
        return story
    }

    componentDidMount() {
        this.getSingleStory(this.state.id)
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
        if (!this.state.kids) {
            return null
        }
        const commentsList = this.state.kids.map((kid, index) =>
            <SingleComment key={index.toString()}
                kid={kid} />
        )
        return (
            <div className="card" style={{marginBottom: "20px"}
            }>
                <div className="card-header" style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div style={{
                            display: "flex",
                            flexDirection: "column"                        
                    }}>
                    <a href={this.state.url} >Link to story</a>
                    <button className="btn btn-outline-secondary">back</button>
                    </div>
                    <h5>Author: {this.state.by}</h5>
                </div>
                <div className="card-body" style={{ 
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <h5 className="card-header">{this.state.title}</h5>
                    <div style={{ marginTop: "12px", marginBottom: "12px", width: "300px" }} className="card">{commentsList}</div>
                </div>
                <div className="card-footer" style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <h5>Score: {this.state.score}</h5> {new Date(this.state.time * 1000).toLocaleString("ru-RU")}
                </div>
            </div >
        )
    }
}