
const RatingModel = require('../models/RatingModel')

//add product
exports.createProduct = (req, res, next) => {
    const product = req.body
    RatingModel.create(product)
        .then(product => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Add product exception', error)
            res.send({status: 1, msg: 'Add product exception, please try again!'})
        })
}
  
//get product list
exports.readAllProducts = (req, res, next) => {
    const {pageNum, pageSize} = req.query
    RatingModel.find({})
        .then(products => {
            res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
        })
        .catch(error => {
            console.error('Get product list exception', error)
            res.send({status: 1, msg: 'Get product list exception, please try again!'})
        })
}
  
//search products
exports.readSearchedProducts = (req, res, next) => {
    const {pageNum, pageSize, productName, productDesc} = req.query
    let contition = {}
    if (productName) {
        contition = {name: new RegExp(`^.*${productName}.*$`)}
    } else if (productDesc) {
        contition = {desc: new RegExp(`^.*${productDesc}.*$`)}
    }
    RatingModel.find(contition)
        .then(products => {
            res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
        })
        .catch(error => {
            console.error('Search products exception', error)
            res.send({status: 1, msg: 'Search products exception, please try again!'})
        })
}
  
//update product
exports.updateProduct = (req, res, next) => {
    const product = req.body
    RatingModel.findOneAndUpdate({_id: product._id}, product)
        .then(oldProduct => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Update product exception', error)
            res.send({status: 1, msg: 'Update product exception, please try again!'})
        })
}
  
//update product status
exports.updateProductStatus = (req, res, next) => {
    const {productId, status} = req.body
    RatingModel.findOneAndUpdate({_id: productId}, {status})
        .then(oldProduct => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Update product status exception', error)
            res.send({status: 1, msg: 'Update product status exception, please try again!'})
        })
}
  
  
//Get the paging information of the array
function pageFilter(arr, pageNum, pageSize) {
    //incase param type is string
    pageNum = pageNum * 1
    pageSize = pageSize * 1

    const total = arr.length
    const pages = Math.floor((total + pageSize - 1) / pageSize)
    const start = pageSize * (pageNum - 1)
    const end = start + pageSize <= total ? start + pageSize : total
    const list = []
    for (var i = start; i < end; i++) {
        list.push(arr[i])
    }
  
    return {
        pageNum,
        total,
        pages,
        pageSize,
        list
    }
}