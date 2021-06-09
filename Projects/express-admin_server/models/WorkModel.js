
const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
  user_id: {type: String, required: true}, 
  tasks: {type: Array, default: []},
})

const WorkModel = mongoose.model('work', workSchema)

module.exports = WorkModel