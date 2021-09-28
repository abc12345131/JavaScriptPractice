import {combineReducers} from 'redux'
import { 
    RECEIVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER 
} from './action-types'

const initialState = {
    user: {},
    errorMsg: '',
    redirectTo: ''
}

function userReducer (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return {...action.data, redirectTo: '/'}
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