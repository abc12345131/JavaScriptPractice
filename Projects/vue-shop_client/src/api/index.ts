import ajax from './ajax';

//login with username and password
export const reqUsernameLogin = (username, password, captcha) => ajax({username, password, captcha})

//login with phone number and SMS verification code
export const reqPhoneLogin = (phone, code) => ajax({phone, code})

//logout
export const reqLogout = () => ajax({})
