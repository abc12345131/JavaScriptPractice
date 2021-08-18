
const CategoryModel = require('../models/CategoryModel')

//add category
exports.createCategory = (req, res, next) => {
    const {categoryName, parentId} = req.body
    CategoryModel.create({name: categoryName, parentId: parentId || '0'})
        .then(category => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Add category exception', error)
            res.send({status: 1, msg: 'Add category exception, please try again!'})
        })
}

//get category list
exports.readCategories = (req, res, next) => {
    const parentId = req.query.parentId || '0'
    CategoryModel.find({parentId})
        .then(categorys => {
            res.send({status: 0, data: categorys})
        })
        .catch(error => {
            console.error('Get category list exception', error)
            res.send({status: 1, msg: 'Get category list exception, please try again!'})
        })
}
  
//update category
exports.updateCategory = (req, res, next) => {
    const {categoryId, categoryName} = req.body
    CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
        .then(oldCategory => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Update category exception', error)
            res.send({status: 1, msg: 'Update category exception, please try again!'})
        })
}
  
//get category
exports.readCategory = (req, res, next) => {
    const categoryId = req.params.categoryId
    CategoryModel.findOne({_id: categoryId})
        .then(category => {
            res.send({status: 0, data: category})
        })
        .catch(error => {
            console.error('Get category exception', error)
            res.send({status: 1, msg: 'Get category exception, please try again!'})
        })
}