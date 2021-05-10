import ajax from './ajax';

const Base = ''

//login
export const reqLogin = (username, password) => ajax(Base + '/login', {username, password}, 'POST')
//register&&add user
export const reqAddUser = (user) => ajax(Base + '/manage/user/add', user, 'POST')
//weather api
export const reqWeather = (city) => {
    const apiUrl= `http://api.weatherapi.com/v1/current.json?key=78792b6e7fe541328bd34938210505&q=${city}&aqi=no`
    return ajax(apiUrl)}
//get category
export const reqCategories = (parentId) => ajax(Base + '/manage/category/list', {parentId})
//add category
export const reqAddCategories = (categoryName, parentId) => ajax(Base + '/manage/category/add', {categoryName, parentId}, 'POST')
//update category
export const reqUpdateCategories = (categoryId, categoryName) => ajax(Base + '/manage/category/update', {categoryId, categoryName}, 'POST')