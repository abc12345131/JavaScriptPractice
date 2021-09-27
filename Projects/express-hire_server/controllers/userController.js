const UserModel = require('../models/UserModel')
// const { sign } = require('../utils/jsonwebtoken')
// const { JWT_SECRET } = require('../config/config')

const md5 = require('blueimp-md5')

//register or add user
exports.createUser = (req, res, next) => {
    const {username, password} = req.body
    // query username
    UserModel.findOne({username})
        .then(user => {
            if (user) {
                res.send({status: 1, msg: 'Someone already uses the username, please try another one!'})
                return new Promise(() => {})
            } else {
                return UserModel.create({...req.body, password: md5(password)})
            }
        })
        .then(user => {
            res.send({status: 0, msg: 'User added successfully!', data: user})
        })
        .catch(error => {
            console.error('Add user exception', error)
            res.send({status: 1, msg: 'Add user exception, please try again!'})
        })
}

//login
exports.userLogin = (req, res, next) => {
    const { username } = req.params
    const { password } = req.body
    UserModel.findOne({username, password: md5(password)})
        .then(user => {
            if (user) {       
                // create response cookie
                res.cookie('user_id', user._id, { expires: new Date(Date.now() + 3600000) })
                //use session
                //req.session.user = user
                res.send({status: 0, data: user})          
            } else {
                res.send({status: 1, msg: 'Username or password is incorrect!'})
            }
        })
        .catch(error => {
            console.error('Login exception', error)
            res.send({status: 1, msg: 'Login exception, please try again!'})
        })
}

//update user
exports.updateUser = (req, res, next) => {
    const user = req.body
    user.password = md5(user.password)
    UserModel.findOneAndUpdate({_id: user._id}, user)
        .then(oldUser => {
            res.send({status: 0, data: user})
        })
        .catch(error => {
            console.error('Update user exception', error)
            res.send({status: 1, msg: 'Update user exception, please try again!'})
        })
}

//delete user
exports.deleteUser = (req, res, next) => {
    const {userId} = req.query
    UserModel.deleteOne({_id: userId})
        .then(doc => {
            res.send({status: 0, data: doc})
        })
        .catch(error => {
            console.error('Delete user exception', error)
            res.send({status: 1, msg: 'Delete user exception, please try again!'})
        })
}
  
//get user list
exports.readAllUsers = (req, res, next) => {
    UserModel.find({username: {'$ne': 'admin'}}) //admin don't want to be listed
        .then(users => {
        })
        .catch(error => {
            console.error('Get user list exception', error)
            res.send({status: 1, msg: 'Get user list exception, please try again!'})
        })
}
