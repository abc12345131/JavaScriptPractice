const express = require('express')

const categoryController = require('../controllers/categoryController')
const productController = require('../controllers/productController')
const roleController = require('../controllers/roleController')
const userController = require('../controllers/userController')
const workController = require('../controllers/workController')
const fileController = require('../controllers/fileController')

const protect = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/category')
    .get(protect, categoryController.readCategory)
    .post(protect, categoryController.createCategory)
    .put(protect, categoryController.updateCategory)

router.route('/categories')
    .get(protect, categoryController.readCategories)


router.route('/product')
    .post(protect, productController.createProduct)
    .put(protect, productController.updateProduct)

router.route('/products')
    .get(protect, productController.readAllProducts)

router.route('/productsearch')
    .get(protect, productController.readSearchedProducts)

router.route('/productstatus')
    .put(protect, productController.updateProductStatus)


router.route('/role')
    .post(protect, roleController.createRole)
    .put(protect, roleController.updateRole)

router.route('/roles')
    .get(protect, roleController.readRoles)


router.route('/user')
    .get(userController.readUser)
    .post(userController.createUser)
    .put(protect, userController.updateUser)
    .delete(protect, userController.deleteUser)

router.route('/users')
    .get(protect, userController.readAllUsers)


router.route('/work')
    .get(protect, workController.readWork)


router.route('/img')
    .post(protect, fileController.createImg)
    .delete(protect, fileController.deleteImg)


module.exports = router;
