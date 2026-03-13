import request from 'supertest';
import app from '../../src/app';

describe('Comment Routes Integration Tests', () => {
    const newCommentPayload = {
        content: 'This is a comment.',
        status: 'SUBMITTED',
        userId: 1,
        observationId: 1,
    };
    let authCookie: string;
    let newCommentId: number;

    beforeAll(async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            email: 'admin@admin.com',
            password: 'Azerty123456!',
        });

        authCookie = loginResponse.headers['set-cookie'];
    });
    it('should create a new comment', async () => {
        const response = await request(app)
            .post('/api/comments')
            .set('Cookie', authCookie)
            .send(newCommentPayload);
        newCommentId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should retrieve a comment by ID', async () => {
        const response = await request(app)
            .get(`/api/comments/${newCommentId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', newCommentId);
    });

    it('should update a comment', async () => {
        const response = await request(app)
            .put(`/api/comments/${newCommentId}`)
            .set('Cookie', authCookie)
            .send({ content: 'This is an updated comment.' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('content', 'This is an updated comment.');
    });

    it('should delete a comment', async () => {
        const response = await request(app)
            .delete(`/api/comments/${newCommentId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(204);
    });
});
