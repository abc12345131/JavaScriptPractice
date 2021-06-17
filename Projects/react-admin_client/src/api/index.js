import ajax from './ajax';

const Base = '/api'

//login
export const reqLogin = (username, password) => ajax(Base + '/user', {username, password})

//weather api
export const reqWeather = (city) => {
    const apiUrl= `http://api.weatherapi.com/v1/current.json?key=78792b6e7fe541328bd34938210505&q=${city}&aqi=no`
    return ajax(apiUrl)}


//get categories
export const reqCategories = (parentId) => ajax(Base + '/categories', {parentId})
//add category
export const reqAddCategory = (categoryName, parentId) => ajax(Base + '/category', {categoryName, parentId}, 'POST')
//update category
export const reqUpdateCategory = (categoryId, categoryName) => ajax(Base + '/category', {categoryId, categoryName}, 'PUT')
//identify category
export const reqIdentifyCategory = (categoryId) => ajax(Base + '/category', {categoryId})

//get products(by page)
export const reqProducts = (pageNum, pageSize) => ajax(Base + '/products', {pageNum, pageSize})
//search products by name/description
export const reqSearchProducts = (pageNum, pageSize, searchType, keywords ) => ajax(Base + '/productsearch', {pageNum, pageSize, [searchType]:keywords})
//update product status (available/unavailable)
export const reqUpdateStatus = (productId, status) => ajax(Base + '/productstatus', {productId, status}, 'PUT')
//add product or update product
export const reqAddOrUpdateProduct = (product) => ajax(Base + '/product', product, (product._id ? 'PUT': 'POST'))

//delete image
export const reqDeleteImg = (name) => ajax(Base + '/img', {name}, 'DELETE')

//get roles
export const reqRoles = () => ajax(Base + '/roles')
//add role
export const reqAddRole = (roleName) => ajax(Base + '/role', {roleName}, 'POST')
//update role
export const reqUpdateRole = (role) => ajax(Base + '/role', role, 'PUT')

//get Users
export const reqUsers = () => ajax(Base + '/users')
//delete User
export const reqDeleteUser = (userId) => ajax(Base + '/user', {userId}, 'DELETE')
//add or update User
export const reqAddOrUpdateUser = (user) => ajax(Base + '/user', user, (user._id ? 'PUT': 'POST'))

//get current user's work
export const reqWork = (userId) => ajax(Base + '/work', {userId})