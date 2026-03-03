import { CreateUserDTO, UpdateUserDTO, User } from '../types/user';
import { apiService } from './apiService';

export const userService = {
    async getAll(): Promise<User[]> {
        return apiService.get<User[]>('/users');
    },

    async getById(id: number): Promise<User> {
        return apiService.get<User>(`/users/${id}`);
    },

    async create(user: CreateUserDTO): Promise<User> {
        return apiService.post<User>('/users', user);
    },

    async update(id: number, user: UpdateUserDTO): Promise<User> {
        return apiService.put<User>(`/users/${id}`, user);
    },

    async delete(id: number): Promise<void> {
        return apiService.delete<void>(`/users/${id}`);
    },
};
