import { StateInterface, Story } from "../types"



const initialState: StateInterface = {
    newStoriesIds: [],
    newStories: [],
    isStoryOpen: false,
    currentStory: {},
    isContentLoaded: false
}

export default initialState