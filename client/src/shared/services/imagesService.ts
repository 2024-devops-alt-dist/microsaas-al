import { CreateImageDTO, Image, UpdateImageDTO } from '../types/images';
import { apiService } from './apiService';

export const imagesService = {
    async getAll(): Promise<Image[]> {
        return apiService.get<Image[]>('/images');
    },

    async getById(id: number): Promise<Image> {
        return apiService.get<Image>(`/images/${id}`);
    },

    async create(image: CreateImageDTO): Promise<Image> {
        return apiService.post<Image>('/images', image);
    },

    async update(id: number, image: UpdateImageDTO): Promise<Image> {
        return apiService.put<Image>(`/images/${id}`, image);
    },

    async delete(id: number): Promise<void> {
        return apiService.delete<void>(`/images/${id}`);
    },
};
