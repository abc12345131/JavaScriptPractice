import ajax from './ajax';

const Base = ''

export const reqLogin = (username, password) => ajax(Base + '/login', {username, password}, 'POST')

export const reqAddUser = (user) => ajax(Base + '/manage/user/add', user, 'POST')

export const reqWeather = (city) => {
    const apiUrl= `http://api.weatherapi.com/v1/current.json?key=78792b6e7fe541328bd34938210505&q=${city}&aqi=no`
    return ajax(apiUrl)}