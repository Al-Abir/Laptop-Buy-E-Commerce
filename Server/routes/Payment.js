const express = require('express');
const { paymentController } = require('../controllers/paymentController');
const router = express.Router();



router.post('/init', paymentController);


module.exports = router