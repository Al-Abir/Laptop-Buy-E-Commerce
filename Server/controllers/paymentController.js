const SSLCommerzPayment = require('sslcommerz-lts');
const Order = require('../models/oderModel')

const paymentController = async (req, res) => {
    const { name, address, phone, cart, email } = req.body;
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    // Create an order document
    const order = new Order({
        products: cart.map(item => item.productId),  // Assuming cart contains product IDs
        payment: {
            amount: totalAmount,
            currency: 'BDT',
            method: 'SSLCommerz',
            transactionId: `tran_id_${Date.now()}`,
            date: new Date(),
        },
        customer: {
            name,
            email,
            phone,
            address,
        },
        status: 'Not Process',
        transactionId: `tran_id_${Date.now()}`,
    });

    try {
        // Save the order to the database
        await order.save();

        const data = {
            total_amount: totalAmount,
            currency: 'BDT',
            tran_id: order.transactionId,
            success_url: `${process.env.SERVER_URL}/api/v1/payment/success/tran_id_${order.transactionId}`,
            fail_url: `${process.env.SERVER_URL}/api/v1/payment/fail/tran_id_${order.transactionId}`,
            cancel_url: `${process.env.SERVER_URL}/api/v1/payment/cancel`,
            ipn_url: `${process.env.SERVER_URL}/api/v1/payment/ipn`,
            shipping_method: 'Courier',
            product_name: 'Computer',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: name,
            cus_email: email,
            cus_add1: address,
            cus_add2: '',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: phone,
            cus_fax: phone,
            ship_name: name,
            ship_add1: address,
            ship_add2: '',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: '1000',
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(process.env.store_id, process.env.store_password, false);

        const apiResponse = await sslcz.init(data);
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });
        console.log('Redirecting to: ', GatewayPageURL);
    } catch (error) {
        console.error("SSLCommerz Init Error:", error);
        res.status(500).json({ error: "Payment initialization failed" });
    }
};


const paymentSuccessController = async (req, res) => {
    try {
        const { tranId } = req.params;

        // Remove the 'tran_id_' prefix
        const extractedTranId = tranId.replace("tran_id_", "");

        // Find the order by transaction ID
        const order = await Order.findOne({ transactionId: extractedTranId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update order status
        order.paidStatus = true;
        order.status = "Processing";
        await order.save();

        //res.json({ message: "Payment Successful", order });
        res.redirect(`${process.env.CLIENT_URL}/payment/success`)


    } catch (error) {
        console.error("Payment Success Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const paymentFail = async (req, res) => {
    try {
        const { tranId } = req.params;

        // Delete order by transaction ID (assuming stored as "tran_id_<timestamp>")
        const extractedTranId = tranId.replace("tran_id_", "");

        await Order.findOneAndDelete({ transactionId: extractedTranId });

        console.log("Order deletion successful due to payment failure.");
        res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
    } catch (error) {
        console.error("Payment Fail Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const paymentCancel = () =>{



}

const paymentIPN = () =>{

}
module.exports = {
    paymentController,
    paymentSuccessController,
    paymentFail,
    paymentCancel,
    paymentIPN
};
