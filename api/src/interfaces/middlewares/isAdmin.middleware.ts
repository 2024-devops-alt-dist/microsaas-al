import { NextFunction, Request, Response } from 'express';

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden access' });
    }
};
