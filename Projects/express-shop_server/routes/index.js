const express = require('express')

const categoryController = require('../controllers/categoryController')
const productController = require('../controllers/productController')
const roleController = require('../controllers/roleController')
const userController = require('../controllers/userController')
const workController = require('../controllers/workController')
const fileController = require('../controllers/fileController')

const protect = require('../middlewares/authMiddleware')
const userValidator = require('../validators/userValidator')

const router = express.Router()

router.route('/categories/:categoryId')
    .get(protect, categoryController.readCategory)


router.route('/categories')
    .get(protect, categoryController.readCategories)
    .post(protect, categoryController.createCategory)
    .put(protect, categoryController.updateCategory)


router.route('/products')
    .get(protect, productController.readAllProducts)
    .post(protect, productController.createProduct)
    .put(protect, productController.updateProduct)

router.route('/products/search')
    .get(protect, productController.readSearchedProducts)

router.route('/products/status')
    .put(protect, productController.updateProductStatus)


router.route('/roles')
    .get(protect, roleController.readRoles)
    .post(protect, roleController.createRole)
    .put(protect, roleController.updateRole)


router.route('/users/:username')
    .post(userController.userLogin)


router.route('/users')
    .get(protect, userController.readAllUsers)
    .post(userValidator.register, userController.createUser)
    .put(protect, userController.updateUser)
    .delete(protect, userController.deleteUser)


router.route('/work/:userId')
    .get(protect, workController.readWork)


router.route('/imgs')
    .post(protect, fileController.createImg)
    .delete(protect, fileController.deleteImg)


module.exports = router;
