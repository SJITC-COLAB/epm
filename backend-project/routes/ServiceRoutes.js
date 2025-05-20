const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const ServiceController = require('../controllers/ServiceController');

router.use(authMiddleware);

router.post('/', ServiceController.createService);
router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getServiceById);
router.put('/:id', ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);

module.exports = router; 