const express = require('express');
const { createCheckoutSession, handleStripeWebhook } = require('../controllers/stripe');

const router = express.Router();

router.route('/create-checkout-session').post(createCheckoutSession);
router.route('/webhook').post(handleStripeWebhook);

module.exports = router;
