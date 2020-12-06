import Action from "../../types"


const currentStoryAction: string = "SET_CURRENT_STORY"

const setCurrentStory = (value: string): Action<any> => {
    return { 
        type: currentStoryAction,
        payload: value
    }
}

export default setCurrentStory