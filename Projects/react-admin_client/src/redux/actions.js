import { 
    SET_HEAD_TITLE, 
    //RECEIVE_USER, 
    //SHOW_ERROR_MSG, 
    //RESET_USER 
} from './action-types'
//import { reqLogin } from '../api'
//import storageUtils from '../utils/storageUtils'

export const setHeadTitle = (headTitle) => ({
    type: SET_HEAD_TITLE,
    data: headTitle
})

// export const receiveUser = (user) => ({
//     type: RECEIVE_USER,
//     data: user
// })

// export const showErrorMsg = (errorMsg) => ({
//     type: SHOW_ERROR_MSG,
//     data: errorMsg
// })

// export const logout = () => {
//     //storageUtils.removeUser()
//     cookieUtils.removeUser()
//     return {type: RESET_USER}
// }

// export const login = (username, password) => {
//     return async dispatch => {
//         const result = await reqLogin(username, password)
//         if (result.status === 0) {
//             const user = result.data
//             //save user locally
//             storageUtils.saveUser(user)
//             dispatch(receiveUser(user))
//         } else {
//             const errorMsg = result.msg
//             dispatch(showErrorMsg(errorMsg))
//         }
//     }
// }