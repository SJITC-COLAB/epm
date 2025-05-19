import React, { useState, useEffect } from 'react';
import { getEmployees } from '../services/api';

const SalaryForm = ({ salary, onSubmit, onCancel }) => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employeeNumber: '',
        grossSalary: '',
        totalDeduction: '',
        netSalary: '',
        month: ''
    });

    useEffect(() => {
        loadEmployees();
        if (salary) {
            setFormData({
                employeeNumber: salary.employeeNumber || '',
                grossSalary: salary.grossSalary || '',
                totalDeduction: salary.totalDeduction || '',
                netSalary: salary.netSalary || '',
                month: salary.month || ''
            });
        }
    }, [salary]);

    const loadEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to load employees:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Calculate net salary when gross salary or total deduction changes
        if (name === 'grossSalary' || name === 'totalDeduction') {
            const gross = name === 'grossSalary' ? value : formData.grossSalary;
            const deduction = name === 'totalDeduction' ? value : formData.totalDeduction;
            const net = gross && deduction ? (parseFloat(gross) - parseFloat(deduction)).toFixed(2) : '';
            setFormData(prev => ({
                ...prev,
                netSalary: net
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Employee</label>
                <select
                    name="employeeNumber"
                    value={formData.employeeNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Employee</option>
                    {employees.map(employee => (
                        <option key={employee.employeeNumber} value={employee.employeeNumber}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Month</label>
                <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Month</option>
                    {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Gross Salary</label>
                <input
                    type="number"
                    name="grossSalary"
                    value={formData.grossSalary}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Total Deduction</label>
                <input
                    type="number"
                    name="totalDeduction"
                    value={formData.totalDeduction}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Net Salary</label>
                <input
                    type="number"
                    name="netSalary"
                    value={formData.netSalary}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    {salary ? 'Update' : 'Create'} Salary Record
                </button>
            </div>
        </form>
    );
};

export default SalaryForm; 