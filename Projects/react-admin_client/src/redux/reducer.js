import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'

const initialState = {
    headTitle: 'Home',
    user: storageUtils.getUser()
}

function headTitle (state = initialState.headTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

function user (state = initialState.user, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data
        case SHOW_ERROR_MSG:
            const errorMsg = action.data
            //do not modify origin state!
            return {...state, errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}


/*
    exported state structure
    {
        headTitle: 'Home'
        user: {}
    }
*/
export default combineReducers({
    headTitle,
    user
})