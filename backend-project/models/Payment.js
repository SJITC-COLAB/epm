const { pool } = require('../config/db');

const createPayment = async (payment) => {
    const { RecordNumber, AmountPaid, PaymentDate } = payment;
    const [result] = await pool.query(
        'INSERT INTO Payment (RecordNumber, AmountPaid, PaymentDate) VALUES (?, ?, ?)',
        [RecordNumber, AmountPaid, PaymentDate]
    );
    return result.insertId;
};

const getAllPayments = async () => {
    const [rows] = await pool.query('SELECT * FROM Payment');
    return rows;
};

const getPaymentById = async (PaymentNumber) => {
    const [rows] = await pool.query('SELECT * FROM Payment WHERE PaymentNumber = ?', [PaymentNumber]);
    return rows[0];
};

const updatePayment = async (PaymentNumber, payment) => {
    const { RecordNumber, AmountPaid, PaymentDate } = payment;
    await pool.query(
        'UPDATE Payment SET RecordNumber = ?, AmountPaid = ?, PaymentDate = ? WHERE PaymentNumber = ?',
        [RecordNumber, AmountPaid, PaymentDate, PaymentNumber]
    );
};

const deletePayment = async (PaymentNumber) => {
    await pool.query('DELETE FROM Payment WHERE PaymentNumber = ?', [PaymentNumber]);
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}; 