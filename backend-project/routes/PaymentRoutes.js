const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const PaymentController = require('../controllers/PaymentController');

router.use(authMiddleware);

router.post('/', PaymentController.createPayment);
router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getPaymentById);
router.put('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

module.exports = router; 