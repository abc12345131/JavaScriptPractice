const express = require('express')

const productController = require('../controllers/productController')

const protect = require('../middlewares/authMiddleware')
const userValidator = require('../validators/userValidator')

const router = express.Router()

router.route('/product')
    .post(protect, productController.createProduct)
    .put(protect, productController.updateProduct)

router.route('/products')
    .get(protect, productController.readAllProducts)

router.route('/productsearch')
    .get(protect, productController.readSearchedProducts)

router.route('/productstatus')
    .put(protect, productController.updateProductStatus)


module.exports = router;
