import {  
    SAVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER, 
    SAVE_USER_LIST
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