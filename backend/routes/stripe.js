const express = require('express');
const { createCheckoutSession, handleStripeWebhook } = require('../controllers/stripe');

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.route('/create-checkout-session').post(protect, authorize("admin", "user"), createCheckoutSession);
router.route('/webhook').post(protect, authorize("admin", "user"), handleStripeWebhook);

module.exports = router;
