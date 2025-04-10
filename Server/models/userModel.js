const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        
    },
    email:{
        type:String,
        required:true,
        uique:true
    },
    password:{
        type:String,
        required: true,

    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required: true
    },
    role:{
        type:Number,
        default:0
    }

},{timestamps:true})

const User = mongoose.model('users',userSchema);

module.exports = User;

