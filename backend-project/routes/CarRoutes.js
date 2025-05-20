const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const CarController = require('../controllers/CarController');

router.use(authMiddleware);

router.post('/', CarController.createCar);
router.get('/', CarController.getAllCars);
router.get('/:id', CarController.getCarByPlate);
router.put('/:id', CarController.updateCar);
router.delete('/:id', CarController.deleteCar);

module.exports = router; 