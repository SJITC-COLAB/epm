import React, { useState, useEffect } from 'react';
import { getCars, getServices } from '../services/api';

const ServiceRecordForm = ({ record, onSubmit, onCancel }) => {
    const [cars, setCars] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        PlateNumber: '',
        ServiceCode: '',
        ServiceDate: ''
    });

    useEffect(() => {
        loadCars();
        loadServices();
        if (record) {
            setFormData({
                PlateNumber: record.PlateNumber || '',
                ServiceCode: record.ServiceCode || '',
                ServiceDate: record.ServiceDate ? record.ServiceDate.split('T')[0] : ''
            });
        }
    }, [record]);

    const loadCars = async () => {
        try {
            const response = await getCars();
            setCars(response.data || []);
        } catch (error) {
            setCars([]);
        }
    };

    const loadServices = async () => {
        try {
            const response = await getServices();
            setServices(response.data || []);
        } catch (error) {
            setServices([]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                <select
                    name="PlateNumber"
                    value={formData.PlateNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Car</option>
                    {cars.map(car => (
                        <option key={car.PlateNumber} value={car.PlateNumber}>
                            {car.PlateNumber} - {car.Model}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Service</label>
                <select
                    name="ServiceCode"
                    value={formData.ServiceCode}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Service</option>
                    {services.map(service => (
                        <option key={service.ServiceCode} value={service.ServiceCode}>
                            {service.ServiceName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Service Date</label>
                <input
                    type="date"
                    name="ServiceDate"
                    value={formData.ServiceDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                    {record ? 'Update' : 'Create'} Service Record
                </button>
            </div>
        </form>
    );
};

export default ServiceRecordForm; 