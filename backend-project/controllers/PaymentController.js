const Payment = require('../models/Payment');

exports.createPayment = async (req, res, next) => {
    try {
        const id = await Payment.createPayment(req.body);
        res.status(201).json({ PaymentNumber: id });
    } catch (error) {
        next(error);
    }
};

exports.getAllPayments = async (req, res, next) => {
    try {
        const payments = await Payment.getAllPayments();
        res.json(payments);
    } catch (error) {
        next(error);
    }
};

exports.getPaymentById = async (req, res, next) => {
    try {
        const payment = await Payment.getPaymentById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        next(error);
    }
};

exports.updatePayment = async (req, res, next) => {
    try {
        await Payment.updatePayment(req.params.id, req.body);
        res.json({ message: 'Payment updated' });
    } catch (error) {
        next(error);
    }
};

exports.deletePayment = async (req, res, next) => {
    try {
        await Payment.deletePayment(req.params.id);
        res.json({ message: 'Payment deleted' });
    } catch (error) {
        next(error);
    }
}; 