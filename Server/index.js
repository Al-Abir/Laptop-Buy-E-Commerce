const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan');
const connectDB = require('./confiq/db');
const authRoutes = require('./routes/authRoute')
const categoryRoutes  = require('./routes/CategoryRoutes')
const ProductRoutes =  require('./routes/ProductRoutes')
const Payment = require('./routes/Payment')
const cors = require('cors')

//confiqure env file
dotenv.config();

//Database connect
connectDB();
//rest object
const app = express();

//middlewares 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes )
app.use('/api/v1/product',ProductRoutes)
app.use('api/v1/payment',Payment)

//rest api
app.get('/',(req, res)=>{
    res.send("<h1>Welcome to ecommerce app Hi</h1>")

})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server is Running");
    
})