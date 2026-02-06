import { NextFunction, Request, Response } from 'express';

export const isOwnerOrAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const resourceId = Number(req.params.id);

    if (req.user.role !== 'ADMIN' && resourceId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden access' });
    }

    next();
};
