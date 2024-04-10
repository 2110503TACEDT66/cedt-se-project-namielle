const stripe = require("stripe")("sk_test_51P41CKD7m7MeQAMyg0JqOiUEZpktzf4MDrvUArIVesJ0Vmb7WB44R0DXXQInjGruqPAAt82wGFbZzunSXFqZ77bI009w8SrxuN");


//@desc create checkout session
//@route POST /api/v1/stripe/create-checkout-session
//@access Private
exports.createCheckoutSession = async (req, res) => {
    const product = req.body; //supply with name, price , quantity
    const lineItems = 
        [{
            price_data: {
            currency: "thb",
            product_data: {
                name: "item"
            },
            unit_amount : 100*100
        },
        quantity: 1
    }];

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/3000/?success=true`,
        cancel_url: `${process.env.HOST}/3000/?canceled=true`,
    });
    
    res.status(200).json({id:session.id})

}

//@desc get endpoint of retrieve checkout session status
//@route GET /api/v1/stripe/session-status
//@access Private
exports.getCheckoutSessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.status(200).json({status: session.status, customer_email: session.customer_details.email})
}