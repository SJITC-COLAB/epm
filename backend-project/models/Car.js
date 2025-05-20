const { pool } = require('../config/db');

const createCar = async (car) => {
    const { PlateNumber, Type, Model, ManufacturingYear, DriverPhone, MechanicName } = car;
    await pool.query(
        'INSERT INTO Car (PlateNumber, Type, Model, ManufacturingYear, DriverPhone, MechanicName) VALUES (?, ?, ?, ?, ?, ?)',
        [PlateNumber, Type, Model, ManufacturingYear, DriverPhone, MechanicName]
    );
    return PlateNumber;
};

const getAllCars = async () => {
    const [rows] = await pool.query('SELECT * FROM Car');
    return rows;
};

const getCarByPlate = async (PlateNumber) => {
    const [rows] = await pool.query('SELECT * FROM Car WHERE PlateNumber = ?', [PlateNumber]);
    return rows[0];
};

const updateCar = async (PlateNumber, car) => {
    const { Type, Model, ManufacturingYear, DriverPhone, MechanicName } = car;
    await pool.query(
        'UPDATE Car SET Type = ?, Model = ?, ManufacturingYear = ?, DriverPhone = ?, MechanicName = ? WHERE PlateNumber = ?',
        [Type, Model, ManufacturingYear, DriverPhone, MechanicName, PlateNumber]
    );
};

const deleteCar = async (PlateNumber) => {
    await pool.query('DELETE FROM Car WHERE PlateNumber = ?', [PlateNumber]);
};

module.exports = {
    createCar,
    getAllCars,
    getCarByPlate,
    updateCar,
    deleteCar
}; 