
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  categoryId: {type: String, required: true}, 
  pCategoryId: {type: String, required: true}, 
  name: {type: String, required: true}, 
  price: {type: Number, required: true},
  desc: {type: String},
  status: {type: Number, default: 1}, // 1:Available, 2: Unavailable
  imgs: {type: Array, default: []}, // img file name json string
  detail: {type: String}
})

const ProductModel = mongoose.model('products', productSchema)

module.exports = ProductModel