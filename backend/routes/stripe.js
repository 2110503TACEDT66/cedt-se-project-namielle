const express = require('express');
const { createCheckoutSession, getCheckoutSessionStatus } = require('../controllers/stripe');

const router = express.Router();

router.route('/create-checkout-session').post(createCheckoutSession);
router.route('/session-status').get(getCheckoutSessionStatus);

module.exports = router;