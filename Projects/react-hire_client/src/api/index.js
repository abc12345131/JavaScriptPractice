import ajax from './ajax';

const Base = '/api/v1'

//user register
export const reqRegister = (user) => ajax(Base + '/users', user, 'POST')
//user login
export const reqLogin = (username, password) => ajax(Base + '/users/'+username, {password}, 'POST')
//get user list
export const reqUserList = (userType) => ajax(Base + '/users', {userType})
//get user
export const reqUser = (userId) => ajax(Base + '/users/'+userId)
//update register
export const reqUpdateUser = (info) => ajax(Base + '/users', info, 'PUT')

//get messages
export const reqMessageList = () => ajax(Base + '/messages')
//update messages
export const reqUpdateMessageList = (from) => ajax(Base + '/messages', {from}, 'PUT')