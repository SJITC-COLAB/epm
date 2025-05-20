import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CarPage from './pages/CarPage';
import ServicePage from './pages/ServicePage';
import ServiceRecordPage from './pages/ServiceRecordPage';
import PaymentPage from './pages/PaymentPage';
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
    const token = localStorage.getItem('token');
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
                        path="/cars"
                        element={
                            <ProtectedRoute>
                                <CarPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            <ProtectedRoute>
                                <ServicePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/servicerecords"
                        element={
                            <ProtectedRoute>
                                <ServiceRecordPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payments"
                        element={
                            <ProtectedRoute>
                                <PaymentPage />
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
                    <Route path="/" element={<Navigate to={token ? "/cars" : "/login"} replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
