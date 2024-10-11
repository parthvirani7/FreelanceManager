const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { markPaymentAsPaid, createPayment, getPayments } = require('../controllers/paymentController');
const router = express.Router();

router.route('/').get(protect, getPayments).post(protect, createPayment);
router.put('/:id/pay', protect, markPaymentAsPaid);

module.exports = router;
