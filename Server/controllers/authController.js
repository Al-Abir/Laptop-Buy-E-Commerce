const userModel = require('../models/userModel');
const orderModel = require('../models/oderModel');
const productModel = require("../models/productModel")
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const { route } = require('../routes/authRoute');
const JWT = require('jsonwebtoken')
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered. Please login.",
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create and save new user
        const user =  new userModel({ name, email, phone, address, password: hashedPassword });
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error("Error in Registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


//loginController
const loginController = async(req,res) => {
    try {
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        //check user
        const user = await  userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: "Email is not registerd"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn: "7d"
        });
        res.status(200).send({
            success:true,
            message:"Login successfully",
            user:{
                name: user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        });
    }catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }

}

const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;

        // Find the user by ID from auth middleware
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Password validation
        if (password && password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        // Check if email update is valid and unique
        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already in use." });
            }
        }

        // Prepare update data
        const updateData = {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            address: address || user.address
        };

        // Hash new password if provided
        if (password) {
            updateData.password = await hashPassword(password);
        }

        // Update user in database
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, updateData, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating profile",
            error: error.message
        });
    }
};


//orders

const getOrdersController = async (req, res) => {
      try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products").populate("buyer","name")
        res.status(200).send({
            success:true,
            orders
        })

        
      } catch (error) {
           console.log(error)
           res.status(500).send({
            success:false,
            message:"Error while geting orders",
            error
           })

      }
};

module.exports = { registerController, loginController,updateProfileController, getOrdersController };
