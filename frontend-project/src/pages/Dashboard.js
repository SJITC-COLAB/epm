import React from 'react';
import Navigation from '../components/Navigation';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Add your dashboard content here */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard; 