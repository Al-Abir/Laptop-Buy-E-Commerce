
const userModel = require('../models/userModel')

const registerController = async (req, res) =>{
     try {
        const{name, email,password,phone,adress} = req.body
        //validtaion
        if(!name){
            return res.send({error: 'Name is Required'})
        }
        if(!email){
            return res.send({error: 'Email is Required'})
        }
        if(!password){
            return res.send({error: 'Password is Required'})
        }
        if(!phone){
            return res.send({error: 'Phone number is Required'})
        }
        if(!adress){
            return res.send({error: 'Adress is Required'})
        }
       //check user
       const existingUser = await userModel.findOne({email})

        
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
     }
}

module.exports = {
    registerController
}