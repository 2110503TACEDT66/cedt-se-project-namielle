const Booking = require("../models/Booking");
const Transaction = require("../models/Transaction");

const stripe = require("stripe")(
    "sk_test_51P2sG5ISGle84u6wJZUCQOVDpSnb264Ncchdis2WU2qscWQH92Q2NV4mD8fzbCpdKWNET9e1smgmFOacb9oWJrwv00VvflTupa"
);
const endpointSecret =
    "whsec_536a6080d3ea400784e6301f45968c82aac410f64a16e3031726bfed4d031188";

//@desc create checkout session
//@route POST /api/v1/stripe/create-checkout-session
//@access Private
exports.createCheckoutSession = async (req, res) => {
    const products = await req.body; //supply with name, price
    
    const lineItems = products.cartItems.map((product) => ({
        price_data: {
            currency: "thb",
            product_data: {
                name: product.name,
            },
            unit_amount: product.price * 100,
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.HOST}/3000?success=true`,
        cancel_url: `${process.env.HOST}/3000?canceled=true`,
    });

    products.cartItems.map(async (product) => {
        await Transaction.create({
            session_id: session.id,
            checkInDate: product.checkInDate,
            checkOutDate: product.checkOutDate,
            hotel: product.hid,
            user: '6602da850657e3e7351b2f07',
            stripe_id: "NULL"
        })
    });


    res.status(200).json({ id: session.id });
};

//@desc get endpoint of retrieve checkout session status
//@route GET /api/v1/stripe/session-status
//@access Private
exports.getCheckoutSessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
    );

    res.status(200).json({
        status: session.status,
        customer_email: session.customer_details.email,
    });
};

exports.handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(event.type);

    if (event.type === "checkout.session.completed") {
        // const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        //     event.data.object.id,
        //     {
        //         expand: ["line_items"],
        //     }
        // );
        // const lineItems = sessionWithLineItems.line_items;

        // console.log(lineItems.data);
        // createBooking(lineItems.data);

        console.log(event.data.object)
        const transaction = await Transaction.find({session_id: event.data.object.id});
        transaction.forEach(async element => {
            element.stripe_id = event.data.object.payment_intent;
            await Transaction.findByIdAndUpdate(element.id, element, {
                new: true,
                runValidators: true,
            })
        });
    }

    res.json({ received: true });
};
