const { pool } = require('../config/db');

const createServiceRecord = async (record) => {
    const { PlateNumber, ServiceCode, ServiceDate } = record;
    const [result] = await pool.query(
        'INSERT INTO ServiceRecord (PlateNumber, ServiceCode, ServiceDate) VALUES (?, ?, ?)',
        [PlateNumber, ServiceCode, ServiceDate]
    );
    return result.insertId;
};

const getAllServiceRecords = async () => {
    const [rows] = await pool.query('SELECT * FROM ServiceRecord');
    return rows;
};

const getServiceRecordById = async (RecordNumber) => {
    const [rows] = await pool.query('SELECT * FROM ServiceRecord WHERE RecordNumber = ?', [RecordNumber]);
    return rows[0];
};

const updateServiceRecord = async (RecordNumber, record) => {
    const { PlateNumber, ServiceCode, ServiceDate } = record;
    await pool.query(
        'UPDATE ServiceRecord SET PlateNumber = ?, ServiceCode = ?, ServiceDate = ? WHERE RecordNumber = ?',
        [PlateNumber, ServiceCode, ServiceDate, RecordNumber]
    );
};

const deleteServiceRecord = async (RecordNumber) => {
    await pool.query('DELETE FROM ServiceRecord WHERE RecordNumber = ?', [RecordNumber]);
};

module.exports = {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
    updateServiceRecord,
    deleteServiceRecord
}; 