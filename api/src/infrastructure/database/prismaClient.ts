import { PrismaClient } from '../../generated/prisma/client.js';

export const prisma = new PrismaClient();

export function connectPrisma() {
    return prisma.$connect();
}

export function disconnectPrisma() {
    return prisma.$disconnect();
}
