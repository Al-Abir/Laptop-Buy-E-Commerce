const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan');
const connectDB = require('./confiq/db');
const authRoutes = require('./routes/authRoute')


//confiqure env file
dotenv.config();

//Database connect
connectDB();
//rest object
const app = express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)
//rest api
app.get('/',(req, res)=>{
    res.send("<h1>Welcome to ecommerce app Hi</h1>")

})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server is Running");
    
})