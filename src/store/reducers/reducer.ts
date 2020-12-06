import { StateInterface } from "../initialState";
import initialState from "../initialState";
import  Action  from "../../types";

// type Action = {
//     type: string,
//     // value: any
//     value: Array<string> | boolean | object
// }


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
    }
    return state
}

export default reducer