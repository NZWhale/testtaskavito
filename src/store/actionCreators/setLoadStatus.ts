import Action from "../../types"


const isContentLoaded: string = "SET_LOAD_STATUS"

const setLoadStatus = (value: boolean): Action<any> => {
    return { 
        type: isContentLoaded,
        payload: value
    }
}

export default setLoadStatus