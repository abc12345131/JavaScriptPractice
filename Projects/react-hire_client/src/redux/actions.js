import { io } from 'socket.io-client'
import {  
    SAVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER, 
    SAVE_USER_LIST,
    SAVE_MESSAGE_LIST,

} from './action-types'
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

export const initIO = () =>{
    if(!io.socket) {
        io.socket = io("wss://localhost:5000")
        io.socket.on('receiveMsg', (message) => {
            console.log('Client receive message from server', message)
        })
    }
}

//async 
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
      console.log('Client send message to server', {from, to, content})
      io.socket.emit('sendMsg', {from, to, content})
    }
}

export const saveMessageList = ({users, messageList}) => ({
    type: SAVE_MESSAGE_LIST,
    data: {users, messageList}
})

export const saveMessage = (message) => ({
    type: SAVE_MESSAGE_LIST,
    data: message
})
