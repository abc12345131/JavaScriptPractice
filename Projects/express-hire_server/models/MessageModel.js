
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    from: {type: String, required: true}, 
    to: {type: String, required: true}, 
    chat_id: {type: String, required: true}, 
    content: {type: String, required: true}, 
    read: {type: Boolean, default: false}, 
    create_time: {type: Number, default: Date.now},
})

const MessageModel = mongoose.model('messages', messageSchema)

module.exports = MessageModel