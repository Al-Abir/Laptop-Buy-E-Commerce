const express = require('express');
const { paymentController, paymentSuccessController, paymentFail, paymentCancel, paymentIPN } = require('../controllers/paymentController');
const { requireSignIn } = require('../middlewares/authMiddleware');
const router = express.Router();



router.post('/init',paymentController);

 router.post('/success/:tranId',paymentSuccessController);
 router.post('/fail/:tranId', paymentFail);
 router.post('/cancel',paymentCancel);
 router.post('/ipn', paymentIPN);



module.exports = router