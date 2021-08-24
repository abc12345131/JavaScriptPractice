
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    is_in_serving: {type: Boolean, default: true},
    description: {type: String}, 
    title: {type: String}, 
    link: {type: String}, 
    image_url: {type: string},
    icon_url: {type: String},
    title_color: {type: String},
})

const CategoryModel = mongoose.model('categories', categorySchema)

module.exports = CategoryModel