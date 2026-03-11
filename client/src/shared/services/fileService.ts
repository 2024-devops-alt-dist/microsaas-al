import { apiService } from './apiService';

export const fileService = {
    async upload(file: File): Promise<{ url: string }> {
        const formData = new FormData();
        formData.append('file', file);

        return await apiService.post('/api/files', {
            body: formData,
        });
    },
};