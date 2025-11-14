import app from './app.js';
import logger from './utils/logger.js';
import { config } from './config/env.js';
import { connectPrisma, disconnectPrisma } from './infrastructure/database/prismaClient.js';

const API_PORT = config.API_PORT;

async function startServer() {
    try {
        await connectPrisma();
        logger.info('✅ Postresql connection successed');
    } catch (err) {
        logger.error('❌ Database connection failed :', err);
    }

    const server = app.listen(API_PORT, () => {
        logger.info(`Server running on http://localhost:${API_PORT}`);
    });

    const shutdown = async () => {
        logger.info('Shuting down server...');
        await disconnectPrisma();
        server.close(() => {
            logger.info('Server closed');
            process.exit(0);
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

startServer();
