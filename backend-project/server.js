const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { pool, testConnection } = require('./config/db');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

// New CRPMS routes
const serviceRoutes = require('./routes/ServiceRoutes');
const carRoutes = require('./routes/CarRoutes');
const serviceRecordRoutes = require('./routes/ServiceRecordRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/servicerecords', serviceRecordRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server only if database connection is successful
const startServer = async () => {
    try {
        const isConnected = await testConnection();
        if (!isConnected) {
            console.error('Failed to connect to database. Server not started.');
            process.exit(1);
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer(); 