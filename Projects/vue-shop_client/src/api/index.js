import ajax from './ajax';

const Base = '/api/v1'

//login with username and password
export const reqUsernameLogin = (username, password, captcha) => ajax(Base + '/users/username', {username, password, captcha}, 'POST')

//login with phone number and SMS verification code
export const reqPhoneLogin = (phone, code) => ajax(Base + '/users/phone', {phone, code}, 'POST')

//logout
export const reqLogout = () => ajax(Base + '/users/logout', 'POST')

//get food catrgories
export const reqFoodCategories = () => ajax(Base + '/categories')

//get address
export const reqAddress = (latitude, longitude) => ajax(Base + '/address', {latitude, longitude})

//get shops
export const reqSearchShops = (latitude, longitude, keyword) => ajax(Base + '/shops', {latitude, longitude, keyword})

//get SMS verification code
export const reqSmsCode = (phone) => ajax(Base + '/smscode', {phone})

//get user info
export const reqUserInfo = () => ajax(Base + '/users')
