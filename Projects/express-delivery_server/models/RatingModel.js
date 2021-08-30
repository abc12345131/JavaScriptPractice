
const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    place_id: {type: String, required: true}, 
    ratings: {type: Array, default: []}
})

const RatingModel = mongoose.model('ratings', ratingSchema)

module.exports = RatingModel