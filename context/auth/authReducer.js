import {
    AUTHENTICATED_USER, 
    SIGN_IN_SUCCESS, 
    SIGN_IN_FAIL, 
    CLEAN_ALERT,
    START_SPINNER,
    LOG_IN_FAILED,
    LOG_IN_SUCCESS,
    LOG_OUT
} from "../../types";

const reducer = ( state, action ) => {
    switch (action.type) {
    
        case AUTHENTICATED_USER: 
            return {
                ...state,
                user: action.payload
            }

        case SIGN_IN_SUCCESS:
        case SIGN_IN_FAIL:
        case CLEAN_ALERT:
        case LOG_IN_FAILED:
            return {
                ...state,
                message: action.payload,
                loading: false
            }

        case LOG_IN_SUCCESS: 

            localStorage.setItem("token", action.payload)

            return {
                ...state,
                loading: false,
                authenticated: true,
                token: action.payload,
            }

        case START_SPINNER:
            return {
                ...state,
                loading: true
            }

        case LOG_OUT:

            localStorage.removeItem("token")

            return {
                ...state,
                user: null,
                token: null,
                authenticated: null,
            }

        default: return state
    }
}
export default reducer;