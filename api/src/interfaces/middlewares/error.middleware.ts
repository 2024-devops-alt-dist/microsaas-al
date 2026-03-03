import { Request, Response, NextFunction } from 'express';

type AppError = Error & { status?: number; statusCode?: number; details?: unknown };

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const error = err as AppError;
    const statusCode = error.status ?? error.statusCode ?? 500;
    const message = error.message ?? 'Internal Server Error';
    res.status(statusCode).json({
        statusCode,
        message,
        details: error.details,
    });
};
