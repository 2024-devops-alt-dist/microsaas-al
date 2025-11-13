import mockData from '../data/mockObservations.json';
import type { Observation } from '../types/observation';

export const mockApi = {
    async getAll(): Promise<Observation[]> {
        return [...mockData];
    },
    async create(observation: Observation): Promise<Observation> {
        return { id: mockData.length + 1, ...observation };
    },
    async delete(id: number) {
        console.log(`Mock delete observation with id: ${id}`);
        return { success: true };
    },
};
