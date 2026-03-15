import { createContext } from 'react';
import { AuthenticatedUser } from '../../../shared/types/user';

export interface AuthContextInterface {
    user: AuthenticatedUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);
