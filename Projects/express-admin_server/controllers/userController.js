
const UserModel = require('../models/UserModel')
const RoleModel = require('../models/RoleModel')

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
            res.send({status: 0, msg: 'User added successfully!'})
        })
        .catch(error => {
            console.error('Add user exception', error)
            res.send({status: 1, msg: 'Add user exception, please try again!'})
        })
}

//login
exports.readUser = (req, res, next) => {
    const {username, password} = req.query
    UserModel.findOne({username, password: md5(password)})
        .then(user => {
            if (user) {
                if (user.role_id) {
                    RoleModel.findOne({_id: user.role_id})
                        .then(role => {
                            user._doc.role = role
                            // create resonse cookie with role information
                            res.cookie('user_key', user, { expires: new Date(Date.now() + 3600000) })
                            res.send({status: 0})
                        })
                } else {
                    user._doc.role = {menus: []}
                    // create resonse cookie with role information
                    res.cookie('user_key', user, { expires: new Date(Date.now() + 3600000) })
                    res.send({status: 0})
                }  
            } else {
                res.send({status: 1, msg: 'Username or passwoed is incorrect!'})
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
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Update user exception', error)
            res.send({status: 1, msg: 'Update user exception, please try again!'})
        })
}

//delete user
exports.deleteUser = (req, res, next) => {
    const {userId} = req.body
    UserModel.deleteOne({_id: userId})
        .then((doc) => {
            res.send({status: 0})
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
            RoleModel.find().then(roles => {
                res.send({status: 0, data: {users, roles}})
            })
        })
        .catch(error => {
            console.error('Get user list exception', error)
            res.send({status: 1, msg: 'Get user list exception, please try again!'})
        })
}
