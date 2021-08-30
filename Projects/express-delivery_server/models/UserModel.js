
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  //username
  username: {type: String},
  //password
  password: {type: String},
  //phone number
  phone: {type: String}
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel


