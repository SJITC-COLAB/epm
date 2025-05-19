import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    console.log('AuthProvider rendering'); // Debug log
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        console.log('Login attempt with credentials:', credentials); // Debug log
        try {
            // For testing purposes, accept any username/password
            setIsAuthenticated(true);
            setUser({ username: credentials.username });
            return true;
        } catch (error) {
            console.error('Login error:', error); // Debug log
            throw error;
        }
    };

    const logout = () => {
        console.log('Logout called'); // Debug log
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 