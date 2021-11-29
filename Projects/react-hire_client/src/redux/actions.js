import { io } from 'socket.io-client'
import {  
    SAVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER, 
    SAVE_USER_LIST,
    SAVE_MESSAGE_LIST,
    SAVE_MESSAGE,
    READ_MESSAGE
} from './action-types'
import { reqMessageList } from '../api'
import cookieUtils from '../utils/cookieUtils'

export const saveUser = (user) => ({
    type: SAVE_USER,
    data: user
})

export const showErrorMsg = (errorMsg) => ({
    type: SHOW_ERROR_MSG,
    data: errorMsg
})

export const removeUser = () => {
    cookieUtils.removeUser()
    return {type: RESET_USER}
}

export const saveUserList = (userList) => ({
    type: SAVE_USER_LIST,
    data: userList
})

export const saveMessage = (message, userId) => ({
    type: SAVE_MESSAGE,
    data: {message, userId}
})

export const readMessage = (count, from, to) => ({
    type: READ_MESSAGE,
    data: {count, from, to}
})

export const saveMessageList = (users, messageList, userId) => ({
    type: SAVE_MESSAGE_LIST,
    data: {users, messageList, userId}
})

const initIO = (dispatch, userId) =>{
    if(!io.socket) {
        io.socket = io() //use "http://localhost:5000" for local development
        io.socket.on('receiveMsg', (message) => {
            console.log('Client receive message from server', message)
            if(userId===message.from || userId===message.to) {
                dispatch(saveMessage(message, userId))
            }
        })
    }
}

export const fetchMessageList = (userId) => {
    return async dispatch => {
        initIO(dispatch, userId)
        const result = await reqMessageList()
        if(result.status===0) {         
            const {users, messageList} = result.data      
            dispatch(saveMessageList(users, messageList, userId))
        } else {
            console.log('Get Message list exception, Please try again!')
        }
    }
}

export const sendMessage = ({from, to, content}) => {
    return dispatch => {
        console.log('Client send message to server', {from, to, content})
        io.socket.emit('sendMsg', {from, to, content})
    }
}