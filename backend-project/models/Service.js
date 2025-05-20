const { pool } = require('../config/db');

const createService = async (service) => {
    const { ServiceName, ServicePrice } = service;
    const [result] = await pool.query(
        'INSERT INTO Services (ServiceName, ServicePrice) VALUES (?, ?)',
        [ServiceName, ServicePrice]
    );
    return result.insertId;
};

const getAllServices = async () => {
    const [rows] = await pool.query('SELECT * FROM Services');
    return rows;
};

const getServiceById = async (ServiceCode) => {
    const [rows] = await pool.query('SELECT * FROM Services WHERE ServiceCode = ?', [ServiceCode]);
    return rows[0];
};

const updateService = async (ServiceCode, service) => {
    const { ServiceName, ServicePrice } = service;
    await pool.query(
        'UPDATE Services SET ServiceName = ?, ServicePrice = ? WHERE ServiceCode = ?',
        [ServiceName, ServicePrice, ServiceCode]
    );
};

const deleteService = async (ServiceCode) => {
    await pool.query('DELETE FROM Services WHERE ServiceCode = ?', [ServiceCode]);
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
}; 