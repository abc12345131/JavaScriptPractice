import ajax from "./ajax.js";

const Base = ''

export const reqLogin = (username, password) => ajax(Base + '/login', {username, password}, 'POST')

export const reqAddUser = (user) => ajax(Base + '/manage/user/add', user, 'POST')