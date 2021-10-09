const ChatModel = require('../models/ChatModel')
const UserModel = require('../models/UserModel')

//update user
exports.updateChatList = (req, res, next) => {
    const info = req.body
    const userId = req.cookies.user_id
    ChatModel.findOneAndUpdate({_id: userId}, {$set: {info}}, {new: true})
        .then(newUser => {
            if(!newUser) {
                res.clearCookie('user_id')
                res.send({status: 1, msg: 'Update user exception, please try again!'})
            } else {
                res.send({status: 0, data: newUser})
            }
        })
        .catch(error => {
            console.error('Update user exception', error)
            res.send({status: 1, msg: 'Update user exception, please try again!'})
        })
}

//get user 
exports.readChatList = (req, res, next) => {
    const { userId } = req.params

    const { userType } = req.query
    UserModel.find({userType})
        .then(users => {
            console.log(`Send users: ${users}`)
            res.send({status: 0, data: users})  
        })
        .catch(error => {
            console.error('Get user list exception', error)
            res.send({status: 1, msg: 'Get user list exception, please try again!'})
        })
    ChatModel.findOne({_id: userId})
        .then(user => {
            console.log(`Send user ${userId}: ${user}`)
            res.send({status: 0, data: user})  
        })
        .catch(error => {
            console.error('Get user exception', error)
            res.send({status: 1, msg: 'Get user exception, please try again!'})
        })
}
  
//get user list
exports.readUserList = (req, res, next) => {
    const { userType } = req.query
    ChatModel.find({userType})
        .then(users => {
            console.log(`Send users: ${users}`)
            res.send({status: 0, data: users})  
        })
        .catch(error => {
            console.error('Get user list exception', error)
            res.send({status: 1, msg: 'Get user list exception, please try again!'})
        })
}
