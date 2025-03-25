const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        name: String,
        slug: String,
        description: String,
        price: Number,
        quantity: Number,
        shipping: Boolean,
    
    }],
    payment: {
        amount: Number,
        currency: String,
        method: String,
        transactionId: String,
        date: Date,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Failed", "Cancelled"],
    },
    paidStatus:{
         type:Boolean,
         default:false
    },
    transactionId: String,
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);