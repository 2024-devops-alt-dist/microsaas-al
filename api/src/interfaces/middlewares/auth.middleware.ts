import { NextFunction, Request, Response } from 'express';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { IAuthService } from '../../domain/services/IAuthService.js';

export const authMiddleware =
    (authService: IAuthService, findUserById: FindUserById) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.cookies.access_token;

            if (!accessToken) {
                return res.status(401).json({ message: 'Access token is missing' });
            }

            const decodedToken = authService.verifyAccessToken(accessToken);

            if (typeof decodedToken === 'string') {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const user = await findUserById.execute(decodedToken.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
            };

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
