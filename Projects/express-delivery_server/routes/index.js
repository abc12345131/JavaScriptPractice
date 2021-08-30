const express = require('express')

const addressController = require('../controllers/addressController')
const captchaController = require('../controllers/captchaController')
const categoryController = require('../controllers/categoryController')
const shopController = require('../controllers/shopController')
const smsController = require('../controllers/smsController')
const userController = require('../controllers/userController')
const goodController = require('../controllers/goodController')
const ratingController = require('../controllers/ratingController')
const infoController = require('../controllers/infoController')

const userValidator = require('../validators/userValidator')

const router = express.Router()

router.route('/address')
    .get(addressController.readAddress)

router.route('/captcha')
    .get(captchaController.readCaptcha)

router.route('/categories')
    .get(categoryController.readAllCategories)

router.route('/shops')
    .get(shopController.readShops)

router.route('/smscode')
    .get(smsController.readCode)


router.route('/users')
    .get(userController.readUser)

router.route('/users/username')
    .post(userValidator.usernameRegister, userController.usernameLogin)

router.route('/users/phone')
    .post(userValidator.phoneRegister, userController.phoneLogin)

router.route('/users/logout')
    .post(userController.logout)


router.route('/goods')
    .get(goodController.readGoods)

router.route('/ratings')
    .get(ratingController.readRatings)

router.route('/infos')
    .get(infoController.readInfos)


module.exports = router;