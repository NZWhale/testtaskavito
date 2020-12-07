import  Action, { Story }  from "../../types"

const newStoriesAction: string = "SET_NEW_STORIES"

const setNewStories = (value: Array<Story>): Action<any> => {
    return { 
        type: newStoriesAction,
        payload: value
    }
}

export default setNewStories