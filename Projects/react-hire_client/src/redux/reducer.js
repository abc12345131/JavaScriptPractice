import {combineReducers} from 'redux'
import { 
    RECEIVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER 
} from './action-types'
import { getRedirectPath } from '../utils/redirectUtils' 

const initialState = {
    user: {},
    errorMsg: '',
    redirectTo: ''
}

function userReducer (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER:
            const {userType, info} = action.data
            return {...action.data, redirectTo: getRedirectPath(userType, info)}
        case SHOW_ERROR_MSG:
            //do not modify origin state!
            return {...state, errorMsg: action.data}
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    userReducer
})