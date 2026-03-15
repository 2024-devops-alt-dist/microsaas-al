import { CreateUserDTO, UpdateUserDTO, User } from '../types/user';
import { apiService } from './apiService';

export const userService = {
    async getAll(): Promise<User[]> {
        return apiService.get<User[]>('/api/users');
    },

    async getById(id: number): Promise<User> {
        return apiService.get<User>(`/api/users/${id}`);
    },

    async create(user: CreateUserDTO): Promise<User> {
        return apiService.post<User>('/api/users', user);
    },

    async update(id: number, user: UpdateUserDTO): Promise<User> {
        return apiService.put<User>(`/apiusers/${id}`, user);
    },

    async delete(id: number): Promise<void> {
        return apiService.delete<void>(`/api/users/${id}`);
    },
};
