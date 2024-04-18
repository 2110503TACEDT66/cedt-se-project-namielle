const express = require("express");
const {
    getDiscounts,
    getDiscount,
    createDiscount,
    updateDiscount,
    deleteDiscount,
} = require("../controllers/discounts");

/*
const bookingRouter = require("./bookings");
const reviewRouter = require("./reviews");
*/

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router
    .route("/")
    .get(getDiscounts)
    .post(protect, authorize("admin"), upload, createDiscount);
router
    .route("/:id")
    .get(getDiscount)
    .put(protect, authorize("admin"), updateDiscount)
    .delete(protect, authorize("admin"), deleteDiscount);
module.exports = router;
