import { apiService } from './apiService';

export const authService = {
    async login(credentials: { email: string; password: string }): Promise<{ token: string }> {
        return apiService.post<{ token: string }>('/auth/login', credentials);
    },

    async register(userData: {
        email: string;
        password: string;
        username: string;
        firstname: string;
        lastname: string;
    }): Promise<void> {
        return apiService.post<void>('/auth/register', userData);
    },

    async getCurrentUser(): Promise<{ name: string; email: string } | null> {
        return apiService.get<{ name: string; email: string }>('/auth/me');
    },

    async logout(): Promise<void> {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
};
