import { apiService } from './apiService';

export const authService = {
    async login(credentials: { email: string; password: string }): Promise<void> {
        return apiService.post<void>('/auth/login', credentials);
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

    async getCurrentUser(): Promise<{ id: number; name: string; email: string } | null> {
        return apiService.get<{ id: number; name: string; email: string }>('/auth/me');
    },

    async logout(): Promise<void> {
        return apiService.post<void>('/auth/logout', {});
    },
};
