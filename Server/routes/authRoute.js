const express = require('express');
const { registerController, loginController, updateProfileController } = require('../controllers/authController');
const {requireSignIn,isAdmin} = require("../middlewares/authMiddleware")
const router = express.Router();

// register
router.post("/register", registerController);

//login
router.post("/login", loginController);
//forgot - password


//protected user route auth
router.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

////protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res)=>{
    res.status(200).send({ok:true})
})

router.put('/profile',requireSignIn, updateProfileController)

module.exports = router;