const express = require('express')
const {requireSignIn,isAdmin} = require("../middlewares/authMiddleware");
const { createProductController, getProductController, getSingleProductController } = require('../controllers/productContrller');
const formidable = require('express-formidable')


const router = express.Router();


// create category
router.post('/create-product',requireSignIn, isAdmin, formidable(),createProductController)

//get products

router.get('/get-product',getProductController)

// get single product

router.get('/get-product/:slug', getSingleProductController)


module.exports = router
