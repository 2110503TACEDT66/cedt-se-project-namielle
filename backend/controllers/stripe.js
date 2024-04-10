const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



//@desc create checkout session
//@route POST /api/v1/stripe/create-checkout-session
//@access Private
exports.createCheckoutSession = async (req, res) => {
    const {product} = req.body; //supply with name, price , quantity
    const lineItems = product.map((item) => ({
        price_data: {
            currency: 'thb',
            product_data: {
                name: item.name,
            },
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: lineItems,
        mode: 'payment',
        return_url: `localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    
    res.status(200).json({id:session.id, client_secret: session.client_secret})

}

//@desc get endpoint of retrieve checkout session status
//@route GET /api/v1/stripe/session-status
//@access Private
exports.getCheckoutSessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.status(200).json({status: session.status, customer_email: session.customer_details.email})
}