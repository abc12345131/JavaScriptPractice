import ajax from './ajax';

const Base = '/api/v1'
const API_KEY = 'AIzaSyCmAjM1QrWFvpw_bFTSsQTopMX2LDrx1do'

//login
export const reqLogin = (username, password, captcha) => ajax(Base + '/user', {username, password, captcha})

//address api
export const reqAddress = (latlng) => {
    const apiUrl= `https://maps.google.com/maps/api/geocode/json?language=EN&latlng=${latlng}&sensor=false&key=${API_KEY}`
    return ajax(apiUrl)}


//get food catrgories
export const reqFoodCategories = () => ajax(Base + '/categories')

//get shops
export const reqShops = (latitude, longitude ) => ajax(Base + '/shops', {latitude, longitude})




//search products by name/description
export const reqSearchProducts = (pageNum, pageSize, searchType, keywords ) => ajax(Base + '/productsearch', {pageNum, pageSize, [searchType]:keywords})
//update product status (available/unavailable)
export const reqUpdateStatus = (productId, status) => ajax(Base + '/productstatus', {productId, status}, 'PUT')
//add product or update product
export const reqAddOrUpdateProduct = (product) => ajax(Base + '/product', product, (product._id ? 'PUT': 'POST'))

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