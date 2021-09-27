import {  
    RECEIVE_USER, 
    SHOW_ERROR_MSG, 
    RESET_USER 
} from './action-types'
import cookieUtils from '../utils/cookieUtils'

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    data: user
})

export const showErrorMsg = (errorMsg) => ({
    type: SHOW_ERROR_MSG,
    data: errorMsg
})

export const logout = () => {
    cookieUtils.removeUser()
    return {type: RESET_USER}
}

export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if (result.status === 0) {
            const user = result.data
            dispatch(receiveUser(user))
        } else {
            const errorMsg = result.msg
            dispatch(showErrorMsg(errorMsg))
        }
    }
}