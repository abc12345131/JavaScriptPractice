import ajax from './ajax';

const Base = '/api/v1'


//user register
export const reqRegister = (user) => ajax(Base + '/users', user, 'POST')
//user login
export const reqLogin = (username, password) => ajax(Base + '/users/'+username, {password}, 'POST')
//get Users
export const reqUsers = () => ajax(Base + '/users')
//delete User
export const reqDeleteUser = (userId) => ajax(Base + '/users', {userId}, 'DELETE')
//update register
export const reqUpdateUser = (info) => ajax(Base + '/users', info, 'PUT')