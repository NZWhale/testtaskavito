import  Action  from "../../types"

const newStoriesAction: string = "SET_NEW_STORIES"

const setNewStories = (value: string): Action<any> => {
    return { 
        type: newStoriesAction,
        payload: value
    }
}

export default setNewStories