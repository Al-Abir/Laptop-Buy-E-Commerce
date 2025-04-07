
const mongoose = require('mongoose')

const connectDB = async ()=>{
    
    try {
        const connet = await mongoose.connect(process.env.MONGO_URL);
        //(`Conneted To MongoDB DataBase ${connet.connection.host}`)
        
    } catch (error) {
        //(`Error in MongoDB ${error}`)
    }
}

module.exports = connectDB;