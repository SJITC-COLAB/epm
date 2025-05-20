import React, { useState, useEffect } from 'react';
import { getServiceRecords, createServiceRecord, updateServiceRecord, deleteServiceRecord } from '../services/api';
import ServiceRecordForm from '../components/ServiceRecordForm';
import Navigation from '../components/Navigation';

const ServiceRecordPage = () => {
    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        try {
            setLoading(true);
            const response = await getServiceRecords();
            setRecords(response.data || []);
            setError('');
        } catch (error) {
            setError('Failed to load service records');
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedRecord(null);
        setShowForm(true);
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setShowForm(true);
    };

    const handleDelete = async (RecordNumber) => {
        if (window.confirm('Are you sure you want to delete this service record?')) {
            try {
                await deleteServiceRecord(RecordNumber);
                await loadRecords();
                setError('');
            } catch (error) {
                setError('Failed to delete service record');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedRecord) {
                await updateServiceRecord(selectedRecord.RecordNumber, formData);
            } else {
                await createServiceRecord(formData);
            }
            setShowForm(false);
            await loadRecords();
            setError('');
        } catch (error) {
            setError('Failed to save service record');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Service Records</h1>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Service Record
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading service records...</div>
                        </div>
                    ) : showForm ? (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedRecord ? 'Edit Service Record' : 'Add Service Record'}
                            </h2>
                            <ServiceRecordForm
                                record={selectedRecord}
                                onSubmit={handleFormSubmit}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Date</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {records && records.length > 0 ? (
                                        records.map((record) => (
                                            <tr key={record.RecordNumber}>
                                                <td className="px-6 py-4 whitespace-nowrap">{record.RecordNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{record.PlateNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{record.ServiceCode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{record.ServiceDate ? record.ServiceDate.split('T')[0] : ''}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(record)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(record.RecordNumber)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                No service records found
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

export default ServiceRecordPage; 