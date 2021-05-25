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
export const reqAddCategory = (categoryName, parentId) => ajax(Base + '/manage/category/add', {categoryName, parentId}, 'POST')
//update category
export const reqUpdateCategory = (categoryId, categoryName) => ajax(Base + '/manage/category/update', {categoryId, categoryName}, 'POST')
//identify category
export const reqIdentifyCategory = (categoryId) => ajax(Base + '/manage/category/info', {categoryId})

//get product(by page)
export const reqProducts = (pageNum, pageSize) => ajax(Base + '/manage/product/list', {pageNum, pageSize})
//search product by name/description
export const reqSearchProducts = (pageNum, pageSize, searchType, keywords ) => ajax(Base + '/manage/product/search', {pageNum, pageSize, [searchType]:keywords})
//update product status (available/unavailable)
export const reqUpdateStatus = (productId, status) => ajax(Base + '/manage/product/updateStatus', {productId, status}, 'POST')
//add product or update product
export const reqAddOrUpdateProduct = (product) => ajax(Base + '/manage/product/'+(product._id ? 'update': 'add'), product, 'POST')

//delete image
export const reqDeleteImg = (name) => ajax(Base + '/manage/img/delete', {name}, 'POST')