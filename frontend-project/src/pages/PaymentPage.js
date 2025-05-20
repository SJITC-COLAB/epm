import React, { useState, useEffect } from 'react';
import { getPayments, createPayment, updatePayment, deletePayment } from '../services/api';
import PaymentForm from '../components/PaymentForm';
import Navigation from '../components/Navigation';

const PaymentPage = () => {
    const [payments, setPayments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            setLoading(true);
            const response = await getPayments();
            setPayments(response.data || []);
            setError('');
        } catch (error) {
            setError('Failed to load payments');
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedPayment(null);
        setShowForm(true);
    };

    const handleEdit = (payment) => {
        setSelectedPayment(payment);
        setShowForm(true);
    };

    const handleDelete = async (PaymentNumber) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                await deletePayment(PaymentNumber);
                await loadPayments();
                setError('');
            } catch (error) {
                setError('Failed to delete payment');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedPayment) {
                await updatePayment(selectedPayment.PaymentNumber, formData);
            } else {
                await createPayment(formData);
            }
            setShowForm(false);
            await loadPayments();
            setError('');
        } catch (error) {
            setError('Failed to save payment');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Payment
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading payments...</div>
                        </div>
                    ) : showForm ? (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedPayment ? 'Edit Payment' : 'Add Payment'}
                            </h2>
                            <PaymentForm
                                payment={selectedPayment}
                                onSubmit={handleFormSubmit}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Record</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {payments && payments.length > 0 ? (
                                        payments.map((payment) => (
                                            <tr key={payment.PaymentNumber}>
                                                <td className="px-6 py-4 whitespace-nowrap">{payment.PaymentNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{payment.RecordNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{payment.AmountPaid}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{payment.PaymentDate ? payment.PaymentDate.split('T')[0] : ''}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(payment)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(payment.PaymentNumber)}
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
                                                No payments found
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

export default PaymentPage; 