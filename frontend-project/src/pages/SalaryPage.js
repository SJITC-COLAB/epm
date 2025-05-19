import React, { useState, useEffect } from 'react';
import { getSalaries, createSalary, updateSalary, deleteSalary } from '../services/api';
import SalaryForm from '../components/SalaryForm';
import Navigation from '../components/Navigation';

const SalaryPage = () => {
    const [salaries, setSalaries] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSalary, setSelectedSalary] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSalaries();
    }, []);

    const loadSalaries = async () => {
        try {
            setLoading(true);
            const response = await getSalaries();
            setSalaries(response.data);
            setError('');
        } catch (error) {
            console.error('Failed to load salaries:', error);
            setError('Failed to load salaries');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedSalary(null);
        setShowForm(true);
    };

    const handleEdit = (salary) => {
        setSelectedSalary(salary);
        setShowForm(true);
    };

    const handleDelete = async (salaryId) => {
        if (window.confirm('Are you sure you want to delete this salary record?')) {
            try {
                await deleteSalary(salaryId);
                await loadSalaries();
                setError('');
            } catch (error) {
                console.error('Failed to delete salary:', error);
                setError('Failed to delete salary');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedSalary) {
                await updateSalary(selectedSalary.salaryId, formData);
            } else {
                await createSalary(formData);
            }
            setShowForm(false);
            await loadSalaries();
            setError('');
        } catch (error) {
            console.error('Failed to save salary:', error);
            setError('Failed to save salary');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Salary Records</h1>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Salary Record
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading salary records...</div>
                        </div>
                    ) : showForm ? (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedSalary ? 'Edit Salary Record' : 'Add Salary Record'}
                            </h2>
                            <SalaryForm
                                salary={selectedSalary}
                                onSubmit={handleFormSubmit}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employee
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Month
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Gross Salary
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deductions
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Net Salary
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {salaries.map((salary) => (
                                        <tr key={salary.salaryId}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {salary.employeeName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {salary.month}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {formatCurrency(salary.grossSalary)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {formatCurrency(salary.totalDeduction)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {formatCurrency(salary.netSalary)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(salary)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(salary.salaryId)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SalaryPage; 