import  Action  from "../../types"


const isStoryOpenAction: string = "SET_IS_STORY_OPEN"

const setIsStoryOpen = (value: string): Action<any> => {
    return { 
        type: isStoryOpenAction,
        payload: value
    }
}

export default setIsStoryOpen