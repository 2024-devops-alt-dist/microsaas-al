import { env } from '../../../config/env.js';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

// const pool = new Pool({
//     connectionString: env.DATABASE_URL,
// });

// const adapter = new PrismaPg(pool);

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });


const envDev = env.NODE_ENV === 'development';

const prisma = new PrismaClient({
    adapter,
    log: envDev ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
});

export { prisma };
