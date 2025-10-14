import express from 'express';
import { config } from './config/env.js';
import logger from './utils/logger.js';
import { pool } from './infrastructure/database/pg/client.js';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: config.FRONT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }),
);

app.get('/api/health', async (_req, res) => {
    try {
        await pool.query('SELECT 1');
        res.send({
            status: 'ok',
            message: 'API connected to database!',
        });
    } catch (error) {
        logger.error('Database query error:', error);
        res.status(500).send({
            status: 'error',
            message: 'Database connection failed',
        });
    }
});

export default app;
