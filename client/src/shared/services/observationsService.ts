import { CreateObservationDTO, Observation, UpdateObservationDTO } from '../types/observations';
import { apiService } from './apiService';

export const observationsService = {
    async getAll(): Promise<Observation[]> {
        return apiService.get<Observation[]>('/observations');
    },

    async getById(id: number): Promise<Observation> {
        return apiService.get<Observation>(`/observations/${id}`);
    },

    async create(observation: CreateObservationDTO): Promise<Observation> {
        return apiService.post<Observation>('/observations', observation);
    },

    async update(id: number, observation: UpdateObservationDTO): Promise<Observation> {
        return apiService.put<Observation>(`/observations/${id}`, observation);
    },

    async delete(id: number): Promise<void> {
        return apiService.delete<void>(`/observations/${id}`);
    },
};
