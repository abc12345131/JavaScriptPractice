const express = require('express')

const userController = require('../controllers/userController')

const protect = require('../middlewares/authMiddleware')
const userValidator = require('../validators/userValidator')

const router = express.Router()

router.route('/users/:username')
    .post(userController.userLogin)


router.route('/users')
    .get(protect, userController.readAllUsers)
    .post(userValidator.register, userController.createUser)
    .put(protect, userController.updateUser)
    .delete(protect, userController.deleteUser)

module.exports = router;
