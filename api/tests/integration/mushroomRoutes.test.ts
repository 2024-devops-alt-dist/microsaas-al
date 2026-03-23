import request from 'supertest';
import app from '../../src/app';

describe('Mushroom Routes Integration Tests', () => {
    const newMushroomPayload = {
        commonName: 'Amanite tue-mouches',
        species: 'Amanita',
        genus: 'Amanita',
        family: 'Amanitaceae',
        edibility: 'POISONOUS',
        habitat: 'Forests',
        description: 'Amanite tue-mouches is a highly toxic mushroom.',
    };
    let authCookie: string;
    let newMushroomId: number;

    beforeAll(async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            email: 'admin@admin.com',
            password: 'Azerty123456!',
        });

        authCookie = loginResponse.headers['set-cookie'];
    });
    it('should create a new mushroom', async () => {
        const response = await request(app)
            .post('/api/mushrooms')
            .set('Cookie', authCookie)
            .send(newMushroomPayload);
        newMushroomId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should retrieve a mushroom by ID', async () => {
        const response = await request(app)
            .get(`/api/mushrooms/${newMushroomId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', newMushroomId);
    });

    it('should update a mushroom', async () => {
        const response = await request(app)
            .put(`/api/mushrooms/${newMushroomId}`)
            .set('Cookie', authCookie)
            .send({ commonName: 'Amanite phalloides' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('commonName', 'Amanite phalloides');
    });

    it('should delete a mushroom', async () => {
        const response = await request(app)
            .delete(`/api/mushrooms/${newMushroomId}`)
            .set('Cookie', authCookie);
        expect(response.status).toBe(204);
    });
});
