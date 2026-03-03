import { jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { isAdminMiddleware } from '../../../src/interfaces/middlewares/isAdmin.middleware.js';

describe('Is Admin Middleware', () => {
    it('should call next() if user is admin', () => {
        const req = {
            user: {
                id: '1',
                email: 'admin@example.com',
                role: 'ADMIN',
            },
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const middleware = isAdminMiddleware;
        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user is not admin', () => {
        const req = {
            user: {
                id: '2',
                email: 'user@example.com',
                role: 'user',
            },
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const middleware = isAdminMiddleware;
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden access' });
        expect(next).not.toHaveBeenCalled();
    });
});
