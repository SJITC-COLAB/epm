const Salary = require('../models/salaryModel');

const getAllSalaries = async (req, res, next) => {
    try {
        const salaries = await Salary.findAll();
        res.json(salaries);
    } catch (error) {
        next(error);
    }
};

const getSalaryByEmployeeId = async (req, res, next) => {
    try {
        const salaries = await Salary.findByEmployeeId(req.params.employeeId);
        res.json(salaries);
    } catch (error) {
        next(error);
    }
};

const createSalary = async (req, res, next) => {
    try {
        const salaryId = await Salary.create(req.body);
        res.status(201).json({ id: salaryId, message: 'Salary record created successfully' });
    } catch (error) {
        next(error);
    }
};

const updateSalary = async (req, res, next) => {
    try {
        await Salary.update(req.params.id, req.body);
        res.json({ message: 'Salary record updated successfully' });
    } catch (error) {
        next(error);
    }
};

const deleteSalary = async (req, res, next) => {
    try {
        await Salary.delete(req.params.id);
        res.json({ message: 'Salary record deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSalaries,
    getSalaryByEmployeeId,
    createSalary,
    updateSalary,
    deleteSalary
}; 