import ajax from './ajax';

const Base = '/api'

//weather api
export const reqWeather = (city) => {
    const apiUrl= `http://api.weatherapi.com/v1/current.json?key=78792b6e7fe541328bd34938210505&q=${city}&aqi=no`
    return ajax(apiUrl)}

//get categories
export const reqCategories = (parentId) => ajax(Base + '/categories', {parentId})
//add category
export const reqAddCategory = (categoryName, parentId) => ajax(Base + '/categories', {categoryName, parentId}, 'POST')
//update category
export const reqUpdateCategory = (categoryId, categoryName) => ajax(Base + '/categories', {categoryId, categoryName}, 'PUT')
//identify category
export const reqIdentifyCategory = (categoryId) => ajax(Base + '/categories/'+categoryId)

//get products(by page)
export const reqProducts = (pageNum, pageSize) => ajax(Base + '/products', {pageNum, pageSize})
//search products by name/description
export const reqSearchProducts = (pageNum, pageSize, searchType, keywords ) => ajax(Base + '/products/search', {pageNum, pageSize, [searchType]:keywords})
//update product status (available/unavailable)
export const reqUpdateStatus = (productId, status) => ajax(Base + '/products/status', {productId, status}, 'PUT')
//add product or update product
export const reqAddOrUpdateProduct = (product) => ajax(Base + '/products', product, (product._id ? 'PUT': 'POST'))

//delete image
export const reqDeleteImg = (name) => ajax(Base + '/imgs', {name}, 'DELETE')

//get roles
export const reqRoles = () => ajax(Base + '/roles')
//add role
export const reqAddRole = (roleName) => ajax(Base + '/roles', {roleName}, 'POST')
//update role
export const reqUpdateRole = (role) => ajax(Base + '/roles', role, 'PUT')

//user login
export const reqLogin = (username, password) => ajax(Base + '/users/'+username, {password}, 'POST')
//get Users
export const reqUsers = () => ajax(Base + '/users')
//delete User
export const reqDeleteUser = (userId) => ajax(Base + '/users', {userId}, 'DELETE')
//add or update User
export const reqAddOrUpdateUser = (user) => ajax(Base + '/users', user, (user._id ? 'PUT': 'POST'))

//get current user's work
export const reqWork = (userId) => ajax(Base + '/work/'+userId)