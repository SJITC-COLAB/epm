const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const ServiceRecordController = require('../controllers/ServiceRecordController');

router.use(authMiddleware);

router.post('/', ServiceRecordController.createServiceRecord);
router.get('/', ServiceRecordController.getAllServiceRecords);
router.get('/:id', ServiceRecordController.getServiceRecordById);
router.put('/:id', ServiceRecordController.updateServiceRecord);
router.delete('/:id', ServiceRecordController.deleteServiceRecord);

module.exports = router; 