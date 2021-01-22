import { 
    SHOW_ALERT, 
    CLEAN_ALERT, 
    UPLOAD_FILE_FAIL, 
    UPLOAD_FILE_SUCCESS, 
    CREATE_LINK_FAIL, 
    CREATE_LINK_SUCESS,
    START_SPINNER,
    CLEAN_STATE
} from "../../types";

const reducer = ( state, action ) => {
    switch (action.type) {

        case UPLOAD_FILE_FAIL: 
        case SHOW_ALERT: 
            return {
                ...state,
                fileMessage: action.payload,
                loadingFile: false
            }

        case CLEAN_ALERT: 
            return {
                ...state,
                fileMessage: null
            }

        case UPLOAD_FILE_SUCCESS: 
            return {
                ...state,
                name: action.payload.name,
                fileName: action.payload.fileName,
                loadingFile: false
            }

        case START_SPINNER:
            return {
                ...state,
                loadingFile: action.payload
            }

        case CREATE_LINK_SUCESS: 
            return {
                ...state,
                url: action.payload
            }

        case CLEAN_STATE: 
            return {
                ...state,
                fileMessage: null,
                name: "",
                fileName: "",
                loadingFile: false,
                downloads: 1,
                password: "",
                author: null,
                url: ""
            }

        default: return state
    }
}

export default reducer