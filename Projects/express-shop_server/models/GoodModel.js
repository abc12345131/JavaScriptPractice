
const mongoose = require('mongoose')

const goodSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    icon: {type: String}, //img url
    foods: {type: Array, default: []}
})

const GoodModel = mongoose.model('goods', goodSchema)

module.exports = GoodModel