import  Action  from "../../types"

interface StoriesIds {
    storiesIds: Array<string>
}

const newStoriesIdsAction: string = "SET_NEW_STORIES_IDS"

interface SetNewStoriesIds {
    type: string,
    payload: Action<StoriesIds>
}

const setNewStoriesIds = (value: StoriesIds ): Action<StoriesIds> => {
    return { 
        type: newStoriesIdsAction,
        payload: value
    }
}

export default setNewStoriesIds