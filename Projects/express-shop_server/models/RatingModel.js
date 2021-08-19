
const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    username: {type: String, required: true}, 
    rateTime: {type: Number, required: true}, 
    deliveryTime: {type: Number},
    score: {type: Number},
    rateType: {type: Number, default: 0},
    text: {type: String},
    avatar: {type: String},
    recommend: {type: Array, default: []}
})

const RatingModel = mongoose.model('ratings', ratingSchema)

module.exports = RatingModel