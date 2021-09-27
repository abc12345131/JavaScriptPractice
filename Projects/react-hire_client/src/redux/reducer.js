import {combineReducers} from 'redux'
import { 
    RECEIVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER 
} from './action-types'

const initialState = {
    user: {},
    userType: '',
    errorMsg: ''
}

function user (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER:
            const user = action.data
            return {...state, user: user}
        case SHOW_ERROR_MSG:
            const errorMsg = action.data
            //do not modify origin state!
            return {...state, errorMsg: errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    user
})