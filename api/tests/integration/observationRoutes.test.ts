import request from 'supertest';
import app from '../../src/app';

describe('Observation Routes Integration Tests', () => {
    const newObservationPayload = {
        title: 'New Observation',
        latitude: 0,
        longitude: 0,
        quantity: 1,
        notes: null,
        isPublic: true,
        confidenceLevel: 'HIGH',
        date: new Date(),
        userId: 1,
        mushroomId: null,
    };
    let authCookie: string;
    let newObservationId: number;

    beforeAll(async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            email: 'admin@admin.com',
            password: 'Azerty123456!',
        });

        authCookie = loginResponse.headers['set-cookie'];
    });
    it('should create a new observation', async () => {
        const response = await request(app)
            .post('/api/observations')
            .set('Cookie', authCookie)
            .send(newObservationPayload);
        newObservationId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should retrieve an observation by ID', async () => {
        const response = await request(app)
            .get(`/api/observations/${newObservationId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', newObservationId);
    });

    it('should update an observation', async () => {
        const response = await request(app)
            .put(`/api/observations/${newObservationId}`)
            .set('Cookie', authCookie)
            .send({ title: 'Updated Observation' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Observation');
    });

    it('should delete an observation', async () => {
        const response = await request(app)
            .delete(`/api/observations/${newObservationId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(204);
    });
});
