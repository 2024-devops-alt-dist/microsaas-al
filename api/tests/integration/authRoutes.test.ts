import request from 'supertest';
import app from '../../src/app';

describe('Auth Routes Integration Tests', () => {
    let authCookie: string;

    it('should throw an error for invalid login credentials', async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: 'invalid@admin.com',
            password: 'wrongpassword',
        });
        expect(response.status).toBe(401);
    });

    it('should login successfully with valid credentials', async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            email: 'admin@admin.com',
            password: 'Azerty123456!',
        });
        authCookie = loginResponse.headers['set-cookie'];
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toHaveProperty('message', 'Authenticated');
    });

    it('should get current user info with valid token', async () => {
        const response = await request(app).get('/api/auth/me').set('Cookie', authCookie);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', 'admin@admin.com');
    });

    it('should logout successfully', async () => {
        const response = await request(app).post('/api/auth/logout').set('Cookie', authCookie);
        expect(response.status).toBe(200);
    });

    it('should register a new user', async () => {
        const response = await request(app).post('/api/auth/register').send({
            email: 'newuser@user.com',
            password: 'Password123!',
            username: 'newuser',
            firstname: 'New',
            lastname: 'User',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        const newUserId = response.body.id;

        const deleteResponse = await request(app)
            .delete(`/api/users/${newUserId}`)
            .set('Cookie', authCookie);
        expect(deleteResponse.status).toBe(204);
    });
});
