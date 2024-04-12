const mongoose = require("mongoose");

const RoomTypeSchema = new mongoose.Schema(
    {
        hotel: {
            type: mongoose.Schema.ObjectId,
            ref: "Hotel",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Please add a name"],
            maxlength: [50, "Name can not be more than 50 characaters"],
        },
        roomCapacity: {
            type: Number,
            min: [1, "Capacity must be greater than 0"],
            required: [true, "Please add a capacity"],
        },
        price: {
            type: Number,
            required: [true, "Please add a price"],
        },
    }
);

module.exports = mongoose.model("RoomType", RoomTypeSchema);