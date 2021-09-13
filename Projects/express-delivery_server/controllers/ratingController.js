
const RatingModel = require('../models/RatingModel')

//get shop rating list
exports.readRatings = (req, res, next) => {
    const {place_id} = req.query
    RatingModel.findOne({place_id})
        .then(ratings => {
            if(ratings) {
                res.send({status: 0, data: ratings.ratings})
            } else {
                res.send({status: 0, data: []})
            }
        })
        .catch(error => {
            console.error('Get shop rating list exception', error)
            res.send({status: 1, msg: 'Get shop rating list exception, please try again!'})
        })
}