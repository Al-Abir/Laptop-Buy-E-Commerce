const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan');
const connectDB = require('./confiq/db');
const authRoutes = require('./routes/authRoute')
const categoryRoutes  = require('./routes/CategoryRoutes')
const ProductRoutes =  require('./routes/ProductRoutes')
const Payment = require('./routes/Payment')
const cors = require('cors')

//sequirity
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Configure env file
dotenv.config();

// Database connect
connectDB();

// Rest object
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: "We have received too many requests from this IP. Please try again after one hour."
});

// Middlewares
app.use(helmet())
app.use(limiter); 
app.use(cors());
app.use(express.json());
app.use(mongoSanitize()); 
app.use(xss());
app.use(hpp());  
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', ProductRoutes);
app.use('/api/v1/payment', Payment);

// Default route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to ecommerce app Hi</h1>");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
