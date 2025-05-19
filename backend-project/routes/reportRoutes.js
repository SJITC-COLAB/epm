const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const Salary = require('../models/salaryModel');

router.use(authMiddleware);

router.get('/monthly', async (req, res, next) => {
    try {
        const report = await Salary.getMonthlyReport();
        res.json(report);
    } catch (error) {
        next(error);
    }
});

module.exports = router; 