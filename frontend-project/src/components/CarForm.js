import React, { useState, useEffect } from 'react';

const CarForm = ({ car, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        PlateNumber: '',
        Type: '',
        Model: '',
        ManufacturingYear: '',
        DriverPhone: '',
        MechanicName: ''
    });

    useEffect(() => {
        if (car) {
            setFormData({
                PlateNumber: car.PlateNumber || '',
                Type: car.Type || '',
                Model: car.Model || '',
                ManufacturingYear: car.ManufacturingYear || '',
                DriverPhone: car.DriverPhone || '',
                MechanicName: car.MechanicName || ''
            });
        }
    }, [car]);

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
                <input
                    type="text"
                    name="PlateNumber"
                    value={formData.PlateNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter plate number"
                    disabled={!!car}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                    type="text"
                    name="Type"
                    value={formData.Type}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter car type"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                    type="text"
                    name="Model"
                    value={formData.Model}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter car model"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Manufacturing Year</label>
                <input
                    type="number"
                    name="ManufacturingYear"
                    value={formData.ManufacturingYear}
                    onChange={handleChange}
                    required
                    min="1900"
                    max={new Date().getFullYear()}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter manufacturing year"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Driver Phone</label>
                <input
                    type="text"
                    name="DriverPhone"
                    value={formData.DriverPhone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter driver phone"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Mechanic Name</label>
                <input
                    type="text"
                    name="MechanicName"
                    value={formData.MechanicName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter mechanic name"
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
                    {car ? 'Update' : 'Create'} Car
                </button>
            </div>
        </form>
    );
};

export default CarForm; 