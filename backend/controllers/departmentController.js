const Department = require('../models/departmentModel');

const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (error) {
        next(error);
    }
};

const getDepartmentById = async (req, res, next) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.json(department);
    } catch (error) {
        next(error);
    }
};

const createDepartment = async (req, res, next) => {
    try {
        const departmentId = await Department.create(req.body);
        res.status(201).json({ id: departmentId, message: 'Department created successfully' });
    } catch (error) {
        next(error);
    }
};

const updateDepartment = async (req, res, next) => {
    try {
        await Department.update(req.params.id, req.body);
        res.json({ message: 'Department updated successfully' });
    } catch (error) {
        next(error);
    }
};

const deleteDepartment = async (req, res, next) => {
    try {
        await Department.delete(req.params.id);
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
}; 