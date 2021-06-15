
const WorkModel = require('../models/WorkModel')

//get work
exports.readWork = (req, res, next) => {
    const {userId} = req.body
    WorkModel.findOne({user_id: userId})
        .then(work => {
            res.send({status: 0, data: work})
        })
        .catch(error => {
            console.error('Get work exception', error)
            res.send({status: 1, msg: 'Get work exception, please try again!'})
        })
}
  