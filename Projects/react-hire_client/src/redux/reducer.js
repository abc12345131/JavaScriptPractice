import {combineReducers} from 'redux'
import { 
    SAVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER 
} from './action-types'

const initialState = {
    user: {},
    errorMsg: ''
}

function userReducer (state = initialState, action) {
    switch (action.type) {
        case SAVE_USER:
            return {user: action.data, errorMsg: ''}
        case SHOW_ERROR_MSG:
            //do not modify origin state!
            return {...state, errorMsg: action.data}
        case RESET_USER:
            return initialState
        default:
            return state
    }
}

export default combineReducers({
    userReducer
})