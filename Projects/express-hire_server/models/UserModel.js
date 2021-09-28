
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true}, 
    password: {type: String, required: true, select: false}, 
    userType: {type: String, required: true}, 
    phone: String,
    email: String,
    create_time: {type: Number, default: Date.now},
    role_id: String
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel