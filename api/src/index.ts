import express from 'express';
import logger from './utils/logger.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/test', (_req, res) => {
    res.send({
        status: 'ok',
        message: 'API connected to database!',
    });
});

app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
});
