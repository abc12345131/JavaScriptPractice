
const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    from: {type: String, required: true}, 
    to: {type: String, required: true}, 
    chat_id: {type: String, required: true}, 
    content: {type: String, required: true}, 
    read: {type: Boolean, default: false}, 
    create_time: {type: Number, default: Date.now},
})

const ChatModel = mongoose.model('chats', chatSchema)

module.exports = ChatModel