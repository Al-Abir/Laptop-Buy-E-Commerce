const express = require('express');
const { registerController, loginController,testController  } = require('../controllers/authController');
const {requireSignIn,isAdmin} = require("../middlewares/authMiddleware")
const router = express.Router();

// register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//test routes
router.get("/test",requireSignIn,isAdmin, testController);

module.exports = router;