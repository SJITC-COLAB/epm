const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const { pool } = require('../config/db');

router.use(authMiddleware);

// Daily report: all services performed and payments made today
router.get('/daily', async (req, res, next) => {
    try {
        const [serviceRecords] = await pool.query(`
            SELECT sr.RecordNumber, sr.ServiceDate, c.PlateNumber, c.Type, c.Model, s.ServiceName, s.ServicePrice
            FROM ServiceRecord sr
            JOIN Car c ON sr.PlateNumber = c.PlateNumber
            JOIN Services s ON sr.ServiceCode = s.ServiceCode
            WHERE sr.ServiceDate = CURDATE()
        `);

        const [payments] = await pool.query(`
            SELECT p.PaymentNumber, p.AmountPaid, p.PaymentDate, sr.RecordNumber, c.PlateNumber, s.ServiceName
            FROM Payment p
            JOIN ServiceRecord sr ON p.RecordNumber = sr.RecordNumber
            JOIN Car c ON sr.PlateNumber = c.PlateNumber
            JOIN Services s ON sr.ServiceCode = s.ServiceCode
            WHERE p.PaymentDate = CURDATE()
        `);

        res.json({
            date: new Date().toISOString().slice(0, 10),
            services: serviceRecords,
            payments: payments
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 