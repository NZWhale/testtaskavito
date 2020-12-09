import { StateInterface, Story } from "../types"



const initialState: StateInterface = {
    newStoriesIds: [],
    newStories: [],
    isStoryOpen: false,
    currentStory: {},
    isContentLoaded: false,
    currentComments: []
}

export default initialState