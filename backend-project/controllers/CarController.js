const Car = require('../models/Car');

exports.createCar = async (req, res, next) => {
    try {
        const id = await Car.createCar(req.body);
        res.status(201).json({ PlateNumber: id });
    } catch (error) {
        next(error);
    }
};

exports.getAllCars = async (req, res, next) => {
    try {
        const cars = await Car.getAllCars();
        res.json(cars);
    } catch (error) {
        next(error);
    }
};

exports.getCarByPlate = async (req, res, next) => {
    try {
        const car = await Car.getCarByPlate(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (error) {
        next(error);
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        await Car.updateCar(req.params.id, req.body);
        res.json({ message: 'Car updated' });
    } catch (error) {
        next(error);
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        await Car.deleteCar(req.params.id);
        res.json({ message: 'Car deleted' });
    } catch (error) {
        next(error);
    }
}; 