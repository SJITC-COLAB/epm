const Service = require('../models/Service');

exports.createService = async (req, res, next) => {
    try {
        const id = await Service.createService(req.body);
        res.status(201).json({ ServiceCode: id });
    } catch (error) {
        next(error);
    }
};

exports.getAllServices = async (req, res, next) => {
    try {
        const services = await Service.getAllServices();
        res.json(services);
    } catch (error) {
        next(error);
    }
};

exports.getServiceById = async (req, res, next) => {
    try {
        const service = await Service.getServiceById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error) {
        next(error);
    }
};

exports.updateService = async (req, res, next) => {
    try {
        await Service.updateService(req.params.id, req.body);
        res.json({ message: 'Service updated' });
    } catch (error) {
        next(error);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        await Service.deleteService(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (error) {
        next(error);
    }
}; 