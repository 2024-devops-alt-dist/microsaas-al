import app from './app';
import logger from './utils/logger';
import { config } from './config/env';
import { prisma } from './infrastructure/database/prisma/prisma';

const API_PORT = config.API_PORT;

async function startServer() {
    try {
        await prisma.$connect();
        logger.info('✅ Postresql connection successed');
    } catch (err) {
        logger.error('❌ Database connection failed :', err);
    }

    const server = app.listen(API_PORT, () => {
        logger.info(`Server running on http://localhost:${API_PORT}`);
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
