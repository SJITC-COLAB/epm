const { pool } = require('../config/db');

class Employee {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM employees');
        return rows;
    }

    static async findById(employeeNumber) {
        const [rows] = await pool.query('SELECT * FROM employees WHERE employeeNumber = ?', [employeeNumber]);
        return rows[0];
    }

    static async create(employeeData) {
        const { firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode } = employeeData;
        const [result] = await pool.query(
            'INSERT INTO employees (firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode]
        );
        return result.insertId;
    }

    static async update(employeeNumber, employeeData) {
        const { firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode } = employeeData;
        await pool.query(
            'UPDATE employees SET firstName = ?, lastName = ?, address = ?, position = ?, telephone = ?, gender = ?, hiredDate = ?, departmentCode = ? WHERE employeeNumber = ?',
            [firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode, employeeNumber]
        );
    }

    static async delete(employeeNumber) {
        await pool.query('DELETE FROM employees WHERE employeeNumber = ?', [employeeNumber]);
    }

    static async getMonthlyReport() {
        const [rows] = await pool.query(`
            SELECT e.firstName, e.lastName, e.position, d.departmentName, s.netSalary, s.month
            FROM employees e
            JOIN departments d ON e.departmentCode = d.departmentCode
            JOIN salaries s ON e.employeeNumber = s.employeeNumber
            ORDER BY s.month DESC, e.firstName ASC
        `);
        return rows;
    }
}

module.exports = Employee; 