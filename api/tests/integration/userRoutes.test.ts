import request from 'supertest';
import app from '../../src/app';

describe('User Routes Integration Tests', () => {
    const newUserPayload = {
        email: 'newuser@example.com',
        password: 'Password123!',
        username: 'newuser',
        firstname: 'New',
        lastname: 'User',
        role: 'USER',
    };
    let authCookie: string;
    let newUserId: number;

    beforeAll(async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            email: 'admin@admin.com',
            password: 'Azerty123456!',
        });

        authCookie = loginResponse.headers['set-cookie'];
    });
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .set('Cookie', authCookie)
            .send(newUserPayload);
        newUserId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should retrieve a user by ID', async () => {
        const response = await request(app)
            .get(`/api/users/${newUserId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', newUserPayload.email);
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put(`/api/users/${newUserId}`)
            .set('Cookie', authCookie)
            .send({ firstname: 'newFirstName' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('firstname', 'newFirstName');
    });

    it('should delete a user', async () => {
        const response = await request(app)
            .delete(`/api/users/${newUserId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(204);
    });
});
