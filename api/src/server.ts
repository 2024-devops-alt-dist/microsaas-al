import app from './app.js';
import logger from './utils/logger.js';
import { prisma } from './infrastructure/database/prisma/prisma.js';
import { env } from './config/env.js';

const API_PORT = env.API_PORT;

async function startServer() {
    try {
        await prisma.$connect();
        logger.info('✅ Postresql connection successed');
    } catch (err) {
        logger.error('❌ Database connection failed :', err);
    }

    const server = app.listen(API_PORT, () => {
        logger.info(`Server running on port ${API_PORT}`);
    });

    const shutdown = async () => {
        logger.info('Shuting down server...');
        await prisma.$disconnect();
        server.close(() => {
            logger.info('Server closed');
            process.exit(0);
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

startServer();
