const ServiceRecord = require('../models/ServiceRecord');

exports.createServiceRecord = async (req, res, next) => {
    try {
        const id = await ServiceRecord.createServiceRecord(req.body);
        res.status(201).json({ RecordNumber: id });
    } catch (error) {
        next(error);
    }
};

exports.getAllServiceRecords = async (req, res, next) => {
    try {
        const records = await ServiceRecord.getAllServiceRecords();
        res.json(records);
    } catch (error) {
        next(error);
    }
};

exports.getServiceRecordById = async (req, res, next) => {
    try {
        const record = await ServiceRecord.getServiceRecordById(req.params.id);
        if (!record) return res.status(404).json({ message: 'ServiceRecord not found' });
        res.json(record);
    } catch (error) {
        next(error);
    }
};

exports.updateServiceRecord = async (req, res, next) => {
    try {
        await ServiceRecord.updateServiceRecord(req.params.id, req.body);
        res.json({ message: 'ServiceRecord updated' });
    } catch (error) {
        next(error);
    }
};

exports.deleteServiceRecord = async (req, res, next) => {
    try {
        await ServiceRecord.deleteServiceRecord(req.params.id);
        res.json({ message: 'ServiceRecord deleted' });
    } catch (error) {
        next(error);
    }
}; 