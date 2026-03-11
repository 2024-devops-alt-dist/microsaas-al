import { apiService } from './apiService';

export const authService = {
    async login(credentials: { email: string; password: string }): Promise<void> {
        return apiService.post<void>('/api/auth/login', credentials);
    },

    async register(userData: {
        email: string;
        password: string;
        username: string;
        firstname: string;
        lastname: string;
    }): Promise<void> {
        return apiService.post<void>('/api/auth/register', userData);
    },

    async getCurrentUser(): Promise<{
        id: number;
        email: string;
        username: string;
        firstname: string;
        lastname: string;
        role: string;
    } | null> {
        return apiService.get<{
            id: number;
            email: string;
            username: string;
            firstname: string;
            lastname: string;
            role: string;
        }>('/api/auth/me');
    },

    async logout(): Promise<void> {
        return apiService.post<void>('/api/auth/logout', {});
    },
};
