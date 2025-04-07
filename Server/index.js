const express = require('express')
const dotenv = require('dotenv')

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

app.use(express.json());

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    //"https://laptop-buy-e-commerce.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(mongoSanitize()); 
app.use(xss());
app.use(hpp());  

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', ProductRoutes);
app.use('/api/v1/payment', Payment);

// Default route
app.get('/', (req, res) => {
  res.send({
      activeStatus:true,
      error:false
      
      
  });
});

const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  
});
