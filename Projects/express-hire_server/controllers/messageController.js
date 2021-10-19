const MessageModel = require('../models/MessageModel')
const UserModel = require('../models/UserModel')

//update messages
exports.updateMessageList = (req, res, next) => {
    const {from} = req.body
    const to = req.cookies.user_id
    MessageModel.updateMany({from, to, read: false}, {read: true})
        .then(doc => {
            if(!doc) {
                res.send({status: 1, msg: 'Update MessageMsg exception, please try again!'})
            } else {
                console.log('MessageMsg updated successfully!', doc)
                res.send({status: 0, data: doc.modifiedCount})
            }
        })
        .catch(error => {
            console.error('Update MessageMsg exception', error)
            res.send({status: 1, msg: 'Update MessageMsg exception, please try again!'})
        })
}

//get messages
exports.readMessageList = (req, res, next) => {
    const userId = req.cookies.user_id

    UserModel.find()
        .then(userList => {

            const users= userList.reduce((users, user) => {
                users[user._id]={username: user.username, avatar: user.info.avatar}
                return users
            }, {})

            MessageModel.find({'&or': [{from: userId}, {to: userId}]})
                .then(messageList => {
                    res.send({status: 0, data: {users, messageList}})  
                })
                .catch(error => {
                    console.error('Get Message list exception', error)
                    res.send({status: 1, msg: 'Get Message list exception, please try again!'})
                })
        })
        .catch(error => {
            console.error('Get user list exception', error)
            res.send({status: 1, msg: 'Get user list exception, please try again!'})
        })
}