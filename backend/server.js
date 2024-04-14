const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const hotels = require("./routes/hotels");
const bookings = require("./routes/bookings");
const auth = require("./routes/auth");
const reviews = require("./routes/reviews");
const otp = require("./routes/otp");
const cors = require("cors");
const stripe = require("./routes/stripe");
//Load env vars
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
const bodyParser = require('body-parser');
app.use((req, res, next) => {
    if (req.originalUrl === "/api/v1/stripe/webhook") {
        bodyParser.raw({ type: "application/json" })(req, res, next);
        //   next(); // Do nothing with the body because I need it in a raw state.
    } else {
        express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
    }
});
app.use(cookieParser()); // add cookie parser
app.use(cors());
app.use("/api/v1/hotels", hotels); // add routes path files
app.use("/api/v1/bookings", bookings);
app.use("/api/v1/auth", auth);
app.use("/api/v1/review", reviews);
app.use("/api/v1/otp", otp);
app.use("/api/v1/stripe", stripe);

const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT,
    console.log(
        "Server running in ",
        process.env.NODE_ENV,
        "on " + process.env.HOST + ":" + PORT
    )
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
