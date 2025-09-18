import express from 'express';
import logger from './utils/logger';
import { pool } from './infrastructure/database/pg/client';

const app = express();

app.get('/api/test', async (_req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        logger.info(result);
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
