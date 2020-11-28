export class AppState {
    private newStories: Array<number> = [];

    constructor() {
        this.setCurrentStories()
    }

    setCurrentStories() {
        fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
        .then((response) => response.json())
        .then((data) => {
            this.newStories = data
        })
    }

    getCurrentStories() {
        return this.newStories
    }
    getSingleStory(numberOfStory: string){
        let story = fetch(`https://hacker-news.firebaseio.com/v0/item/${numberOfStory}.json?print=pretty`)
        .then(response => response.json())
        .then((data) => data)
        return story
    }
}

let instance: AppState
export default function getAppInstance(): AppState {
    if(!instance) {
        instance = new AppState()
    }
    return instance
}