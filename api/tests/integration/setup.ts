import supertest from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/infrastructure/database/prisma/prisma';

beforeAll(async () => {
    await prisma.$connect();
});

afterAll(async () => {
    await prisma.$disconnect();
});

export const request = supertest(app);
