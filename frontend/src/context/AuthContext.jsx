import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken('');
        setUser({});
        toast.success('Logged out');
    }, []);

    const fetchProfile = useCallback(async (authToken) => {
        if (!authToken) {
            setLoading(false);
            return;
        }
        try {
            const { data } = await api.get('/auth/profile');
            setUser(data || {});
        } catch (err) {
            console.error("Profile fetch error:", err);
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        fetchProfile(token);
    }, [token, fetchProfile]);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            const newToken = data?.token || '';
            const userData = data?.user || {};

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);
            toast.success('Login successful');
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            const newToken = data?.token || '';
            const newUser = data?.user || {};

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(newUser);
            toast.success('Registered successfully');
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
