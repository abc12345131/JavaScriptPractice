
const CategoryModel = require('../models/CategoryModel')

//get category list
exports.readAllCategories = (req, res, next) => {
    CategoryModel.find({})
        .then(categories => {
            res.send({status: 0, data: categories})
        })
        .catch(error => {
            console.error('Get category list exception', error)
            res.send({status: 1, msg: 'Get category list exception, please try again!'})
        })
}
  