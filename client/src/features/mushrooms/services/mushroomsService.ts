import mockData from '../data/mockMushrooms.json';
import type { Mushroom } from '../types/mushrooms';

export const mockApi = {
    async getAll(): Promise<Mushroom[]> {
        return [...mockData];
    },
    async getById(id: number): Promise<Mushroom | null> {
        const mushroom = mockData.find((m) => m.id === id);
        return mushroom || null;
    },
    async create(mushroom: Mushroom): Promise<Mushroom> {
        return { id: mockData.length + 1, ...mushroom };
    },
    async delete(id: number) {
        console.log(`Mock delete mushroom with id: ${id}`);
        return { success: true };
    },
};
