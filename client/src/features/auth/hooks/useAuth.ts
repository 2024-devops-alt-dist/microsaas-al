import { useState, useEffect } from 'react';
import { authService } from '../../../shared/services/authService';

interface User {
    id: number;
    name: string;
    email: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        await authService.logout();
        setUser(null);
    }

    return { user, isAuthenticated, loading, logout, checkAuth };
}
