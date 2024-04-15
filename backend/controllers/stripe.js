const Transaction = require("../models/Transaction");
const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

//@desc create checkout session
//@route POST /api/v1/stripe/create-checkout-session
//@access Private
exports.createCheckoutSession = async (req, res) => {
    const products = await req.body; //supply with name, price
    // console.log(products);
    //create booking data
    try{
        products.cartItems.map(async (item) => {
            const hotel = await Hotel.findById(item.hid);
            
            if (!hotel) {
                return res.status(404).json({
                    success: false,
                    message: `No hotel with the id of ${item.hid}`,
                });
            }

            req.body.user = req.user.id;
            const hotelCapacity = hotel.capacity;
            const hotelExistedBookings = await Booking.find({
                hotel: item.hid,
            });
            const existedBookings = await Booking.find({ user: req.user.id });
            console.log(item);
            if (hotelExistedBookings.length >= hotelCapacity) {
                return res.status(400).json({
                    success: false,
                    message: `The hotel with ID ${item.hid} has already reached its capacity`,
                });
            }
            if (existedBookings.length >= 3 && req.user.role !== "admin") {
                return res.status(400).json({
                    success: false,
                    message: `The user with ID ${req.user.id} has already made 3 bookings`,
                });
            }
        });

        // const booking = await Booking.create(req.body);
        
        //stripe
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
            success_url: `${process.env.HOST}:3000/mybooking`,
            cancel_url: `${process.env.HOST}:3000/cart`,
        });

        products.cartItems.map(async (product) => {
            await Transaction.create({
                session_id: session.id,
                checkInDate: product.checkInDate,
                checkOutDate: product.checkOutDate,
                hotel: product.hid,
                user: "6602da850657e3e7351b2f07",
                stripe_id: "NULL",
            });
        });
        
        res.status(200).json({ success: true, sessionId: session.id });
    } catch(error){
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Cannot create Booking" });
    }
        // await Booking.create(item);
    
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

    // console.log(event.type);

    if (event.type === "checkout.session.completed") {
        console.log(event.data.object);
        const transaction = await Transaction.find({
            session_id: event.data.object.id,
        });
        transaction.forEach(async (element) => {
            element.stripe_id = event.data.object.payment_intent;
            await Transaction.findByIdAndUpdate(element.id, element, {
                new: true,
                runValidators: true,
            });
        });
    }

    res.json({ received: true });
};
