import { StateInterface } from "../../types";
import initialState from "../initialState";
import  Action  from "../../types";


const reducer = (state = initialState, action: Action<any>): StateInterface => {
    switch (action.type) {
        case "SET_NEW_STORIES_IDS":
            return { ...state, newStoriesIds: action.payload}
        case "SET_NEW_STORIES":
            return { ...state, newStories: action.payload}
        case "SET_IS_STORY_OPEN":
            return { ...state, isStoryOpen: action.payload}
        case "SET_CURRENT_STORY":
            return { ...state, currentStory: action.payload}
        case "SET_LOAD_STATUS":
            return { ...state, isContentLoaded: action.payload}
    }
    return state
}

export default reducer