const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const {
    getAllSalaries,
    getSalaryByEmployeeId,
    createSalary,
    updateSalary,
    deleteSalary
} = require('../controllers/salaryController');

router.use(authMiddleware);

router.get('/', getAllSalaries);
router.get('/employee/:employeeId', getSalaryByEmployeeId);
router.post('/', createSalary);
router.put('/:id', updateSalary);
router.delete('/:id', deleteSalary);

module.exports = router; 