import React, { useState, useEffect } from 'react';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/api';
import DepartmentForm from '../components/DepartmentForm';
import Navigation from '../components/Navigation';

const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            setLoading(true);
            const response = await getDepartments();
            setDepartments(response.data);
            setError('');
        } catch (error) {
            console.error('Failed to load departments:', error);
            setError('Failed to load departments');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedDepartment(null);
        setShowForm(true);
    };

    const handleEdit = (department) => {
        setSelectedDepartment(department);
        setShowForm(true);
    };

    const handleDelete = async (departmentCode) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await deleteDepartment(departmentCode);
                await loadDepartments();
                setError('');
            } catch (error) {
                console.error('Failed to delete department:', error);
                setError('Failed to delete department');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedDepartment) {
                await updateDepartment(selectedDepartment.departmentCode, formData);
            } else {
                await createDepartment(formData);
            }
            setShowForm(false);
            await loadDepartments();
            setError('');
        } catch (error) {
            console.error('Failed to save department:', error);
            setError('Failed to save department');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Department
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading departments...</div>
                        </div>
                    ) : showForm ? (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedDepartment ? 'Edit Department' : 'Add Department'}
                            </h2>
                            <DepartmentForm
                                department={selectedDepartment}
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
                                            Department Code
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Department Name
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {departments.map((department) => (
                                        <tr key={department.departmentCode}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {department.departmentCode}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {department.departmentName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(department)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(department.departmentCode)}
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

export default DepartmentPage; 