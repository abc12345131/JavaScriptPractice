
const md5 = require('blueimp-md5')
const UserModel = require('../models/UserModel')

//get user info
exports.readUser = (req, res, next) => {
    const userid = req.session.userid
    UserModel.findOne({_id: userid})    
        .then(user => {
            if (!user) {
                delete req.session.userid  
                res.send({code: 1, msg: 'Please login first!'})
            } else {
                res.send({code: 0, data: user})
            }
        })
        .catch(error => {
            console.error('Get user info exception', error)
            res.send({status: 1, msg: 'Get user info exception, please try again!'})
        })
}
  
//username and password login
exports.usernameLogin = (req, res, next) => {
    const username = req.body.username
    const password = md5(req.body.password)
    const captcha = req.body.captcha.toLowerCase()

    console.log('/users', username, password, captcha, req.session)

    if(captcha!==req.session.captcha) {
        res.send({code: 1, msg: 'Captcha is wrong!'})
    }
    else {
        //delete one-time captcha
        delete req.session.captcha
    
        UserModel.findOne({username})
            .then(user => {                
                if (user) {
                    console.log('findUser', user)
                    if (user.password !== password) {
                        res.send({code: 1, msg: 'Username or password is not correct!'})
                    } else {
                        req.session.userid = user._id
                        const data = {_id: user._id, username: user.username, phone: user.phone}
                        res.send({code: 0, data})
                    }
                } else {
                    UserModel.create({username, password})
                        .then(user => {
                            req.session.userid = user._id
                            const data = {_id: user._id, username: user.username}
                            res.send({code: 0, data})
                        })
                        .catch(error => {
                            console.error('Create user exception', error)
                            res.send({status: 1, msg: 'Create user exception, please try again!'})
                        })
                }
            })
            .catch(error => {
                console.error('Login exception', error)
                res.send({status: 1, msg: 'Login exception, please try again!'})
            })
    }
}
  
//phone number and SMS verification login
exports.phoneLogin = (req, res, next) => {
    var phone = req.body.phone
    var code = req.body.code

    console.log('/users', phone, code)

    if (user[phone] != code) {
        res.send({code: 1, msg: 'Phone number or SMS verification code is wrong!'})
    }
    else {
        //delete one-time SMS verification code
        delete users[phone]  
  
        UserModel.findOne({phone})
            .then(user => {
                if (user) {
                    req.session.userid = user._id
                    res.send({code: 0, data: user})
                } else {
                    //create new user
                    UserModel.create({phone})
                        .then(user => {
                            req.session.userid = user._id
                            res.send({code: 0, data: user})
                        })
                        .catch(error => {
                            console.error('Create user exception', error)
                            res.send({status: 1, msg: 'Create user exception, please try again!'})
                        })
                }
            })
            .catch(error => {
                console.error('Login exception', error)
                res.send({status: 1, msg: 'Login exception, please try again!'})
            })
    }  
}  

//logout
exports.logout = (req, res, next) => {
    delete req.session.userid
    res.send({code: 0})
}