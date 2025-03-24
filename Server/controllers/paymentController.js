const SSLCommerzPayment = require('sslcommerz-lts');
const { ObjectID } = require('mongodb'); // Assuming you're using MongoDB for ObjectID

const paymentController = async (req, res) => {
    console.log(req.body);
    const { name, address, phone, cart, email } = req.body;
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  
    const data = {
        total_amount: totalAmount, // Use dynamically calculated total amount
        currency: 'BDT',
        tran_id: `tran_id_${Date.now()}`, // Ensure Date.now() is called as a function
        success_url: 'http://localhost:5173/success',
        fail_url: 'http://localhost:5173/fail',
        cancel_url: 'http://localhost:5173/cancel',
        ipn_url: 'http://localhost:5173/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: name, // Use the customer name from the request
        cus_email: email, // Use the email from the request
        cus_add1: address, // Use the address from the request
        cus_add2: '', // Optional, if you have a second address field
        cus_city: 'Dhaka', // Assuming the city is Dhaka, can be dynamic if needed
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: phone, // Use the phone from the request
        cus_fax: phone, // Use the same phone number for fax (optional)
        ship_name: name, // Shipping name could be the same as the customer name
        ship_add1: address, // Shipping address
        ship_add2: '', // Optional, if you have a second address field
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: '1000',
        ship_country: 'Bangladesh',
    };
    console.log(data);

    const sslcz = new SSLCommerzPayment(process.env.store_id,process.env.store_password, false);
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({url:GatewayPageURL});
        console.log('Redirecting to: ', GatewayPageURL);
    });
};

module.exports = {
    paymentController
};
