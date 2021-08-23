
const md5 = require('blueimp-md5')
const UserModel = require('../models/UserModel')

//add product
exports.createProduct = (req, res, next) => {
    const product = req.body
    UserModel.create(product)
        .then(product => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Add product exception', error)
            res.send({status: 1, msg: 'Add product exception, please try again!'})
        })
}
  
//get product list
exports.readAllProducts = (req, res, next) => {
    const {pageNum, pageSize} = req.query
    UserModel.find({})
        .then(products => {
            res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
        })
        .catch(error => {
            console.error('Get product list exception', error)
            res.send({status: 1, msg: 'Get product list exception, please try again!'})
        })
}
  
//search products
exports.readSearchedProducts = (req, res, next) => {
    const {pageNum, pageSize, productName, productDesc} = req.query
    let contition = {}
    if (productName) {
        contition = {name: new RegExp(`^.*${productName}.*$`)}
    } else if (productDesc) {
        contition = {desc: new RegExp(`^.*${productDesc}.*$`)}
    }
    UserModel.find(contition)
        .then(products => {
            res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
        })
        .catch(error => {
            console.error('Search products exception', error)
            res.send({status: 1, msg: 'Search products exception, please try again!'})
        })
}
  
//update product
exports.updateProduct = (req, res, next) => {
    const product = req.body
    UserModel.findOneAndUpdate({_id: product._id}, product)
        .then(oldProduct => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Update product exception', error)
            res.send({status: 1, msg: 'Update product exception, please try again!'})
        })
}
  
//update product status
exports.updateProductStatus = (req, res, next) => {
    const {productId, status} = req.body
    UserModel.findOneAndUpdate({_id: productId}, {status})
        .then(oldProduct => {
            res.send({status: 0})
        })
        .catch(error => {
            console.error('Update product status exception', error)
            res.send({status: 1, msg: 'Update product status exception, please try again!'})
        })
}
  
  
//Get the paging information of the array
function pageFilter(arr, pageNum, pageSize) {
    //incase param type is string
    pageNum = pageNum * 1
    pageSize = pageSize * 1

    const total = arr.length
    const pages = Math.floor((total + pageSize - 1) / pageSize)
    const start = pageSize * (pageNum - 1)
    const end = start + pageSize <= total ? start + pageSize : total
    const list = []
    for (var i = start; i < end; i++) {
        list.push(arr[i])
    }
  
    return {
        pageNum,
        total,
        pages,
        pageSize,
        list
    }
}


//username and password login
router.post('/users/username', function (req, res) {
    const username = req.body.username
    const password = md5(req.body.password)
    const captcha = req.body.captcha.toLowerCase()
    console.log('/users', username, password, captcha, req.session)
  
    // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
    if(captcha!==req.session.captcha) {
      return res.send({code: 1, msg: '验证码不正确'})
    }
    // 删除保存的验证码
    delete req.session.captcha
  
    UserModel.findOne({username}, function (err, user) {
      if (user) {
        console.log('findUser', user)
        if (user.password !== password) {
          res.send({code: 1, msg: 'Username or password is not correct!'})
        } else {
          req.session.userid = user._id
          res.send({code: 0, data: {_id: user._id, username: user.username, phone: user.phone}})
        }
      } else {
            const userModel = new UserModel({username, password})
            userModel.save(function (err, user) {
            // 向浏览器端返回cookie(key=value)
            // res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
            req.session.userid = user._id
            const data = {_id: user._id, username: user.username}
            // 3.2. 返回数据(新的user)
            res.send({code: 0, data})
        })
      }
    })
  })
  
//phone number and SMS verification login
router.post('/users/phone', function (req, res, next) {
    var phone = req.body.phone;
    var code = req.body.code;
    console.log('/users', phone, code);
    if (user[phone] != code) {
        res.send({code: 1, msg: 'U手机号或验证码不正确'});
        return;
    }
    //删除保存的code
    delete users[phone];
  
  
    UserModel.findOne({phone}, function (err, user) {
        if (user) {
            req.session.userid = user._id
            res.send({code: 0, data: user})
        } else {
        //存储数据
        const userModel = new UserModel({phone})
        userModel.save(function (err, user) {
            req.session.userid = user._id
            res.send({code: 0, data: user})
        })
      }
    })  
})