const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
            
        },
        info: {
            type: String,
            required: [true, "Please add an info"],
        },
        code: {
            type: String,
            unique: true,
            required: [true, "Please add a code"],
        },
        percentage: {
            type: String,
            required: [true, "Please add a discount-percentage"],
        }
        /*file: {
            type: String,
            required: [true, "Please add a picture "],
        },*/
    }
);

module.exports = mongoose.model("Discount", DiscountSchema);