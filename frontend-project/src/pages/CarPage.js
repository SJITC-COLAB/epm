import React, { useState, useEffect } from 'react';
import { getCars, createCar, updateCar, deleteCar } from '../services/api';
import CarForm from '../components/CarForm';
import Navigation from '../components/Navigation';

const CarPage = () => {
    const [cars, setCars] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        try {
            setLoading(true);
            const response = await getCars();
            setCars(response.data || []);
            setError('');
        } catch (error) {
            setError('Failed to load cars');
            setCars([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedCar(null);
        setShowForm(true);
    };

    const handleEdit = (car) => {
        setSelectedCar(car);
        setShowForm(true);
    };

    const handleDelete = async (PlateNumber) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await deleteCar(PlateNumber);
                await loadCars();
                setError('');
            } catch (error) {
                setError('Failed to delete car');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedCar) {
                await updateCar(selectedCar.PlateNumber, formData);
            } else {
                await createCar(formData);
            }
            setShowForm(false);
            await loadCars();
            setError('');
        } catch (error) {
            setError('Failed to save car');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Cars</h1>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Car
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading cars...</div>
                        </div>
                    ) : showForm ? (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedCar ? 'Edit Car' : 'Add Car'}
                            </h2>
                            <CarForm
                                car={selectedCar}
                                onSubmit={handleFormSubmit}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic Name</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cars && cars.length > 0 ? (
                                        cars.map((car) => (
                                            <tr key={car.PlateNumber}>
                                                <td className="px-6 py-4 whitespace-nowrap">{car.PlateNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{car.Type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{car.Model}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{car.ManufacturingYear}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{car.DriverPhone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{car.MechanicName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(car)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(car.PlateNumber)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                                No cars found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CarPage; 