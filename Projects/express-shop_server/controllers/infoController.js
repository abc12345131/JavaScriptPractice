
const InfoModel = require('../models/InfoModel')

//get shop info list
exports.readInfos = (req, res, next) => {
    const {place_id} = req.query
    InfoModel.findOne({place_id})
        .then(infos => {
            res.send({status: 0, data: infos.infos})
        })
        .catch(error => {
            console.error('Get shop info list exception', error)
            res.send({status: 1, msg: 'Get shop info list exception, please try again!'})
        })
}