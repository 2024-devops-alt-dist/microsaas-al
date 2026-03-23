import request from 'supertest';
import app from '../../src/app';

describe('Image Routes Integration Tests', () => {
    const newImagePayload = {
        url: 'http://example.com/image.jpg',
        filename: 'image.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        observationId: 1,
        mushroomId: null,
    };
    let authCookie: string;
    let newImageId: number;

    beforeAll(async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            email: 'admin@admin.com',
            password: 'Azerty123456!',
        });

        authCookie = loginResponse.headers['set-cookie'];
    });
    it('should create a new image', async () => {
        const response = await request(app)
            .post('/api/images')
            .set('Cookie', authCookie)
            .send(newImagePayload);
        newImageId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should retrieve an image by ID', async () => {
        const response = await request(app)
            .get(`/api/images/${newImageId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', newImageId);
    });

    it('should update an image', async () => {
        const response = await request(app)
            .put(`/api/images/${newImageId}`)
            .set('Cookie', authCookie)
            .send({ url: 'http://example.com/new-image.jpg' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('url', 'http://example.com/new-image.jpg');
    });

    it('should delete an image', async () => {
        const response = await request(app)
            .delete(`/api/images/${newImageId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(204);
    });
});
