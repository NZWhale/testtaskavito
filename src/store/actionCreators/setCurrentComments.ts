import Action, { Story } from "../../types"


const currentCommentsAction: string = "SET_CURRENT_COMMENTS"

const setCurrentStory = (value: Array<Comment> | null): Action<any> => {
    return { 
        type: currentCommentsAction,
        payload: value
    }
}

export default setCurrentStory