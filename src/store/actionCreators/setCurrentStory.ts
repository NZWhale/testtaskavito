import Action, { Story } from "../../types"


const currentStoryAction: string = "SET_CURRENT_STORY"

const setCurrentStory = (value: Story): Action<any> => {
    return { 
        type: currentStoryAction,
        payload: value
    }
}

export default setCurrentStory