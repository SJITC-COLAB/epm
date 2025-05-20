import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../services/api';
import Navigation from '../components/Navigation';

const ServiceForm = ({ service, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        ServiceName: '',
        ServicePrice: ''
    });

    useEffect(() => {
        if (service) {
            setFormData({
                ServiceName: service.ServiceName || '',
                ServicePrice: service.ServicePrice || ''
            });
        }
    }, [service]);

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
                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                    type="text"
                    name="ServiceName"
                    value={formData.ServiceName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter service name"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Service Price</label>
                <input
                    type="number"
                    name="ServicePrice"
                    value={formData.ServicePrice}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter service price"
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
                    {service ? 'Update' : 'Create'} Service
                </button>
            </div>
        </form>
    );
};

const ServicePage = () => {
    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            setLoading(true);
            const response = await getServices();
            setServices(response.data || []);
            setError('');
        } catch (error) {
            setError('Failed to load services');
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedService(null);
        setShowForm(true);
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setShowForm(true);
    };

    const handleDelete = async (ServiceCode) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(ServiceCode);
                await loadServices();
                setError('');
            } catch (error) {
                setError('Failed to delete service');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedService) {
                await updateService(selectedService.ServiceCode, formData);
            } else {
                await createService(formData);
            }
            setShowForm(false);
            await loadServices();
            setError('');
        } catch (error) {
            setError('Failed to save service');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Service
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading services...</div>
                        </div>
                    ) : showForm ? (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedService ? 'Edit Service' : 'Add Service'}
                            </h2>
                            <ServiceForm
                                service={selectedService}
                                onSubmit={handleFormSubmit}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Price</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {services && services.length > 0 ? (
                                        services.map((service) => (
                                            <tr key={service.ServiceCode}>
                                                <td className="px-6 py-4 whitespace-nowrap">{service.ServiceName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{service.ServicePrice}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(service.ServiceCode)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                                No services found
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

export default ServicePage; 