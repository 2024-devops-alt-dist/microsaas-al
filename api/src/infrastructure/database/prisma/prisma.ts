import { env } from '../../../config/env.js';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const { Pool } = require('@prisma/adapter-pg/node_modules/pg');

const pool = new Pool({
    connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const envDev = env.NODE_ENV === 'development';

const prisma = new PrismaClient({
    adapter,
    log: envDev ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
});

export { prisma };
