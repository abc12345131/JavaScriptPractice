import ajax from './ajax';

const Base = '/api/v1'

//user login
export const reqLogin = (username, password) => ajax(Base + '/users/'+username, {password}, 'POST')
//get Users
export const reqUsers = () => ajax(Base + '/users')
//delete User
export const reqDeleteUser = (userId) => ajax(Base + '/users', {userId}, 'DELETE')
//add or update User
export const reqAddOrUpdateUser = (user) => ajax(Base + '/users', user, (user._id ? 'PUT': 'POST'))