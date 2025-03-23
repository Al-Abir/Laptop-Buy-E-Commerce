const SSLCommerzPayment = require("sslcommerz-lts");

const paymentController = async (req, res) => {
    const { name, address, phone, amount, cart, email } = req.body;

    const sslcz = new SSLCommerzPayment(process.env.Store_ID, process.env.Store_Password, false);

    const transactionData = {
        total_amount: amount,
        currency: "BDT",
        tran_id: `tran_${Date.now()}`,
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        fail_url: `${process.env.CLIENT_URL}/payment-fail`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
        customer_name: name,
        customer_email: email || "example@example.com", // Use provided email if available
        customer_phone: phone,
        customer_address: address,
        product_name: "Cart Checkout",
        product_category: "E-commerce",
        product_profile: "general",
    };

    try {
        const apiResponse = await sslcz.init(transactionData);
        return res.json({ redirectUrl: apiResponse.GatewayPageURL });
    } catch (error) {
        console.error("SSLCommerz Error:", error);
        return res.status(500).json({ error: "Payment initiation failed" });
    }
};
module.exports= {
    paymentController
}