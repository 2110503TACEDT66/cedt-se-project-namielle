const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect("mongodb+srv://thamvarutwannachetisara:Thamvarut@hotel-booking.fnb37lo.mongodb.net/?retryWrites=true&w=majority&appName=Hotel-Booking");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
