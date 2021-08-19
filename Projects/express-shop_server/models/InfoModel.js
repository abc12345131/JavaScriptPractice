
const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    is_in_serving: {type: Boolean, default: true},
    description: {type: String}, 
    title: {type: String}, 
    link: {type: String}, 
    image_url: {type: string},
    icon_url: {type: String},
    title_color: {type: String},
})

const InfoModel = mongoose.model('infos', infoSchema)

module.exports = InfoModel