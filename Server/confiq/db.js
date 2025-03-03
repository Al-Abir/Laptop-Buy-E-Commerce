const e = require('express')
const mongoose = require('mongoose')

const connectDB = async ()=>{
    
    try {
        const connet = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conneted To MongoDB DataBase ${connet.connection.host}`)
        
    } catch (error) {
        console.log(`Error in MongoDB ${error}`)
    }
}

module.exports = connectDB;