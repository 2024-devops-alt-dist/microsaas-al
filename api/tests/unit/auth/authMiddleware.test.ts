import { jest } from '@jest/globals';
import { authMiddleware } from '../../../src/interfaces/middlewares/auth.middleware.js';
import { mockAuthService } from './mocks/authService.mock.js';
import { Request, Response, NextFunction } from 'express';
import { mockUser1, mockUserNoPassword } from '../user/mocks/user.mock.js';
import { FindUserById } from '../../../src/usecases/user/findUserById.js';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: number;
            email: string;
            username: string;
            firstname: string;
            lastname: string;
            role: string;
        };
    }
}

describe('Auth Middleware', () => {
    it('should call next() when token is valid and user is found', async () => {
        const req = {
            cookies: {
                access_token: 'valid-jwt-token',
            },
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const authService = mockAuthService;
        authService.verifyAccessToken.mockReturnValue({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'User',
            role: 'USER',
        });

        const findUserById = {
            execute: jest.fn<FindUserById['execute']>().mockResolvedValue(mockUserNoPassword),
        } as unknown as FindUserById;

        const middleware = authMiddleware(authService, findUserById);
        await middleware(req, res, next);

        expect(authService.verifyAccessToken).toHaveBeenCalledWith('valid-jwt-token');
        expect(findUserById.execute).toHaveBeenCalledWith('1');
        expect(req.user).toEqual({
            id: mockUser1.id,
            email: mockUser1.email,
            username: mockUser1.username,
            firstname: mockUser1.firstname,
            lastname: mockUser1.lastname,
            role: mockUser1.role,
        });
        expect(next).toHaveBeenCalled();
    });
});
