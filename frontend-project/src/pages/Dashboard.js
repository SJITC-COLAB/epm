import React, { useEffect, useState } from 'react';
import { getCars, getServices, getServiceRecords, getPayments } from '../services/api';
import Navigation from '../components/Navigation';

const Dashboard = () => {
    const [counts, setCounts] = useState({
        cars: 0,
        services: 0,
        serviceRecords: 0,
        payments: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCounts();
    }, []);

    const loadCounts = async () => {
        try {
            setLoading(true);
            const [carsRes, servicesRes, recordsRes, paymentsRes] = await Promise.all([
                getCars(),
                getServices(),
                getServiceRecords(),
                getPayments()
            ]);
            setCounts({
                cars: carsRes.data.length,
                services: servicesRes.data.length,
                serviceRecords: recordsRes.data.length,
                payments: paymentsRes.data.length
            });
            setError('');
        } catch (error) {
            setError('Failed to load dashboard summary');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Summary</h1>
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading summary...</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow text-center">
                                <div className="text-3xl font-bold text-indigo-600">{counts.cars}</div>
                                <div className="mt-2 text-lg font-medium text-gray-700">Cars</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow text-center">
                                <div className="text-3xl font-bold text-green-600">{counts.services}</div>
                                <div className="mt-2 text-lg font-medium text-gray-700">Services</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow text-center">
                                <div className="text-3xl font-bold text-blue-600">{counts.serviceRecords}</div>
                                <div className="mt-2 text-lg font-medium text-gray-700">Service Records</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow text-center">
                                <div className="text-3xl font-bold text-purple-600">{counts.payments}</div>
                                <div className="mt-2 text-lg font-medium text-gray-700">Payments</div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard; 