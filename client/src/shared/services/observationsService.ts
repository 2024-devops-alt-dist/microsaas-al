import { CreateObservationDTO, Observation, UpdateObservationDTO } from '../types/observations';
import { apiService } from './apiService';

export const observationsService = {
    async getAll(): Promise<Observation[]> {
        return apiService.get<Observation[]>('/api/observations');
    },

    async getById(id: number): Promise<Observation> {
        return apiService.get<Observation>(`/api/observations/${id}`);
    },

    async create(observation: CreateObservationDTO): Promise<Observation> {
        return apiService.post<Observation>('/api/observations', observation);
    },

    async update(id: number, observation: UpdateObservationDTO): Promise<Observation> {
        return apiService.put<Observation>(`/api/observations/${id}`, observation);
    },

    async delete(id: number): Promise<void> {
        return apiService.delete<void>(`/api/observations/${id}`);
    },
};
