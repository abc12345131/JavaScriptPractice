
const RoleModel = require('../models/RoleModel')

//add role
exports.createRole = (req, res, next) => {
    const {roleName} = req.body
    RoleModel.findOne({name: roleName})
        .then(role => {
            if (role) {
                res.send({status: 1, msg: 'This role already exists, please use another one or update it!'})
                return new Promise(() => {})
            } else {
                return RoleModel.create({name: roleName})
            }
        })
        .then(role => {
            res.send({status: 0, data: role})
        })
        .catch(error => {
            console.error('Add role exception', error)
            res.send({status: 1, msg: 'Add role exception, please try again!'})
        })
}
  
//get role list
exports.readRoles = (req, res, next) => {
    RoleModel.find()
        .then(roles => {
            res.send({status: 0, data: roles})
        })
        .catch(error => {
            console.error('Get role list exception', error)
            res.send({status: 1, msg: 'Get role list exception, please try again!'})
        })
}
  
//update role
exports.updateRole = (req, res, next) => {
    const role = req.body
    role.auth_time = Date.now()
    RoleModel.findOneAndUpdate({_id: role._id}, role)
        .then(oldRole => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Update role exception', error)
            res.send({status: 1, msg: 'Update role exception, please try again!'})
        })
}
  