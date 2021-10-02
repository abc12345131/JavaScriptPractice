const express = require('express')

const userController = require('../controllers/userController')

const protect = require('../middlewares/authMiddleware')
const userValidator = require('../validators/userValidator')

const router = express.Router()

router.route('/users/:username')
    .post(userController.userLogin)

router.route('/users/:userId')
    .get(protect, userController.readUser)

router.route('/users')
    .get(protect, userController.readUserList)
    .post(userValidator.register, userController.createUser)
    .put(protect, userController.updateUser)

module.exports = router;
