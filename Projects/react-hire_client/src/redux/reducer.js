import {combineReducers} from 'redux'
import { 
    SAVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER,
    SAVE_USER_LIST, 
    SAVE_MESSAGE_LIST,
    SAVE_MESSAGE
} from './action-types'

const initUserState = {
    user: {},
    errorMsg: ''
}

function userReducer (state = initUserState, action) {
    switch (action.type) {
        case SAVE_USER:
            return {user: action.data, errorMsg: ''}
        case SHOW_ERROR_MSG:
            //do not modify origin state!
            return {...state, errorMsg: action.data}
        case RESET_USER:
            return initUserState
        default:
            return state
    }
}

const initUserListState = {
    userList:[]
}

function userListReducer (state = initUserListState, action) {
    switch (action.type) {
        case SAVE_USER_LIST:
            return {userList: action.data}
        default:
            return state
    }
}

const initChatState = {
    users: {},
    messageList: [],
    unReadCount: 0
}

function chatReducer (state = initChatState, action) {
    switch (action.type) {
        case SAVE_MESSAGE_LIST:
            return {...initChatState, ...action.data}
        case SAVE_MESSAGE:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    userReducer,
    userListReducer,
    chatReducer
})