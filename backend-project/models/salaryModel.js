const { pool } = require('../config/db');

class Salary {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM salaries');
        return rows;
    }

    static async findByEmployeeId(employeeNumber) {
        const [rows] = await pool.query('SELECT * FROM salaries WHERE employeeNumber = ?', [employeeNumber]);
        return rows;
    }

    static async create(salaryData) {
        const { employeeNumber, grossSalary, totalDeduction, netSalary, month } = salaryData;
        const [result] = await pool.query(
            'INSERT INTO salaries (employeeNumber, grossSalary, totalDeduction, netSalary, month) VALUES (?, ?, ?, ?, ?)',
            [employeeNumber, grossSalary, totalDeduction, netSalary, month]
        );
        return result.insertId;
    }

    static async update(salaryId, salaryData) {
        const { grossSalary, totalDeduction, netSalary, month } = salaryData;
        await pool.query(
            'UPDATE salaries SET grossSalary = ?, totalDeduction = ?, netSalary = ?, month = ? WHERE salaryId = ?',
            [grossSalary, totalDeduction, netSalary, month, salaryId]
        );
    }

    static async delete(salaryId) {
        await pool.query('DELETE FROM salaries WHERE salaryId = ?', [salaryId]);
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

module.exports = Salary; 