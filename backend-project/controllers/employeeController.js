const Employee = require('../models/employeeModel');

const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        next(error);
    }
};

const getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        next(error);
    }
};

const createEmployee = async (req, res, next) => {
    try {
        const employeeId = await Employee.create(req.body);
        res.status(201).json({ id: employeeId, message: 'Employee created successfully' });
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        await Employee.update(req.params.id, req.body);
        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        await Employee.delete(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}; 