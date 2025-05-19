import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EmployeePage from './pages/EmployeePage';
import DepartmentPage from './pages/DepartmentPage';
import SalaryPage from './pages/SalaryPage';
import ReportsPage from './pages/ReportsPage';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const App = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Router>
                <Routes>
                    {/* Public route */}
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Protected routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                            <ProtectedRoute>
                                <EmployeePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/departments"
                        element={
                            <ProtectedRoute>
                                <DepartmentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/salaries"
                        element={
                            <ProtectedRoute>
                                <SalaryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute>
                                <ReportsPage />
                            </ProtectedRoute>
                        }
                    />
                    
                    {/* Redirect routes */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
