import React, { useState, useEffect } from 'react';
import { getServiceRecords } from '../services/api';

const PaymentForm = ({ payment, onSubmit, onCancel }) => {
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        RecordNumber: '',
        AmountPaid: '',
        PaymentDate: ''
    });

    useEffect(() => {
        loadRecords();
        if (payment) {
            setFormData({
                RecordNumber: payment.RecordNumber || '',
                AmountPaid: payment.AmountPaid || '',
                PaymentDate: payment.PaymentDate ? payment.PaymentDate.split('T')[0] : ''
            });
        }
    }, [payment]);

    const loadRecords = async () => {
        try {
            const response = await getServiceRecords();
            setRecords(response.data || []);
        } catch (error) {
            setRecords([]);
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
                <label className="block text-sm font-medium text-gray-700">Service Record</label>
                <select
                    name="RecordNumber"
                    value={formData.RecordNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Service Record</option>
                    {records.map(record => (
                        <option key={record.RecordNumber} value={record.RecordNumber}>
                            {record.RecordNumber} - {record.PlateNumber}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
                <input
                    type="number"
                    name="AmountPaid"
                    value={formData.AmountPaid}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter amount paid"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                <input
                    type="date"
                    name="PaymentDate"
                    value={formData.PaymentDate}
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
                    {payment ? 'Update' : 'Create'} Payment
                </button>
            </div>
        </form>
    );
};

export default PaymentForm; 