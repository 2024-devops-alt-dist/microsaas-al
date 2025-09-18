import express from 'express';
import logger from './utils/logger';
import { pool } from './infrastructure/database/pg/client';

const app = express();

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
