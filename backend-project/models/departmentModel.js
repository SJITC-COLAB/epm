const { pool } = require('../config/db');

class Department {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM departments');
        return rows;
    }

    static async findById(departmentCode) {
        const [rows] = await pool.query('SELECT * FROM departments WHERE departmentCode = ?', [departmentCode]);
        return rows[0];
    }

    static async create(departmentData) {
        const { departmentName } = departmentData;
        const [result] = await pool.query(
            'INSERT INTO departments (departmentName) VALUES (?)',
            [departmentName]
        );
        return result.insertId;
    }

    static async update(departmentCode, departmentData) {
        const { departmentName } = departmentData;
        await pool.query(
            'UPDATE departments SET departmentName = ? WHERE departmentCode = ?',
            [departmentName, departmentCode]
        );
    }

    static async delete(departmentCode) {
        await pool.query('DELETE FROM departments WHERE departmentCode = ?', [departmentCode]);
    }
}

module.exports = Department; 