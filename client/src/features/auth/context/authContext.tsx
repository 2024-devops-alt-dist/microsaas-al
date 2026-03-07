import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../../../shared/services/authService';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const currentUser = await authService.getCurrentUser();
            console.log('checkAuth - user:', currentUser);

            setUser(currentUser);
        } catch (error) {
            console.error('checkAuth - error:', error);

            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(credentials: { email: string; password: string }) {
        await authService.login(credentials);
        console.log('login successful, checking auth...');
        await checkAuth();
        console.log('auth checked');
    }

    async function logout() {
        await authService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
