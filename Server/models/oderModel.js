const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    payment: {
        amount: Number,
        currency: String,
        method: String,
        transactionId: String,
        date: Date
    },
    paidStatus: {
        type: Boolean,
        default: false
    },
    transactionId: String,
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Failed", "Cancelled"]
    },
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
