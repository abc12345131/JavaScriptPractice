
const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    place_id: {type: String, required: true}, 
    infos: {type: Array, default: []}
})

const InfoModel = mongoose.model('infos', infoSchema)

module.exports = InfoModel