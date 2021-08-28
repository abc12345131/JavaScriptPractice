
const mongoose = require('mongoose')

const goodSchema = new mongoose.Schema({
    place_id: {type: String, required: true}, 
    goods: {type: Array, default: []}
})

const GoodModel = mongoose.model('goods', goodSchema)

module.exports = GoodModel