const userModel = require('../models/userModel');
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


const testController = (req, res)=>{
   res.send("Protected Routes")
}


module.exports = { registerController, loginController,testController };
