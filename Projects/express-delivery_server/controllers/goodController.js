
const GoodModel = require('../models/GoodModel')
 
//get shop good list
exports.readGoods = (req, res, next) => {
    const {place_id} = req.query
    GoodModel.findOne({place_id})
        .then(goods => {
            if(goods) {
                res.send({status: 0, data: goods.goods})
            } else {
                res.send({status: 0, data: []})
            }
        })
        .catch(error => {
            console.error('Get shop good list exception', error)
            res.send({status: 1, msg: 'Get shop good list exception, please try again!'})
        })
}