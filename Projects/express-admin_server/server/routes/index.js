var express = require('express')
const md5 = require('blueimp-md5')

const UserModel = require('../../models/UserModel')
const CategoryModel = require('../../models/CategoryModel')
const ProductModel = require('../../models/ProductModel')
const RoleModel = require('../../models/RoleModel')
const WorkModel = require('../../models/WorkModel')

var router = express.Router()

//
router.get('/', function(req, res, next) {
  res.send('<h2>Hi</h2>');
});

module.exports = router;
