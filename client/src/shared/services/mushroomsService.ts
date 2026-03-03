import { apiService } from './apiService';
import type { CreateMushroomDTO, Mushroom, UpdateMushroomDTO } from '../types/mushrooms';

export const mushroomsService = {
    async getAll(): Promise<Mushroom[]> {
        return apiService.get<Mushroom[]>('/mushrooms');
    },

    async getById(id: number): Promise<Mushroom> {
        return apiService.get<Mushroom>(`/mushrooms/${id}`);
    },

    async create(mushroom: CreateMushroomDTO): Promise<Mushroom> {
        return apiService.post<Mushroom>('/mushrooms', mushroom);
    },

    async update(id: number, mushroom: UpdateMushroomDTO): Promise<Mushroom> {
        return apiService.put<Mushroom>(`/mushrooms/${id}`, mushroom);
    },

    async delete(id: number): Promise<void> {
        return apiService.delete<void>(`/mushrooms/${id}`);
    },
};
