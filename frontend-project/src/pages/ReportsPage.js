import React, { useState, useEffect } from 'react';
import { getDailyReport } from '../services/api';
import Navigation from '../components/Navigation';

const ReportsPage = () => {
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {
        try {
            setLoading(true);
            const response = await getDailyReport();
            setReport(response.data);
            setError('');
        } catch (error) {
            setError('Failed to load daily report');
            setReport(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Daily Report</h1>
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading daily report...</div>
                        </div>
                    ) : report ? (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Services Performed ({report.date})</h2>
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {report.services && report.services.length > 0 ? (
                                                report.services.map((s) => (
                                                    <tr key={s.RecordNumber}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{s.RecordNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{s.PlateNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{s.Type}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{s.Model}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{s.ServiceName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{s.ServicePrice}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No services performed today</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Payments Made ({report.date})</h2>
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {report.payments && report.payments.length > 0 ? (
                                                report.payments.map((p) => (
                                                    <tr key={p.PaymentNumber}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{p.PaymentNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{p.RecordNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{p.PlateNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{p.ServiceName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{p.AmountPaid}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{p.PaymentDate ? p.PaymentDate.split('T')[0] : ''}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No payments made today</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
};

export default ReportsPage; 