
export interface StateInterface{
    newStoriesIds: Array<string>,
    newStories: {},
    isStoryOpen: boolean,
    currentStory: Object,
}

const initialState: StateInterface = {
    newStoriesIds: [],
    newStories: {},
    isStoryOpen: false,
    currentStory: {}
}

export default initialState