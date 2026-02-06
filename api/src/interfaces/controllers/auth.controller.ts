import { Request, Response, NextFunction } from 'express';
import { LoginUser } from '../../usecases/auth/loginUser.js';
import { RefreshAccessToken } from '../../usecases/auth/refreshAccessToken.js';

export class AuthController {
    constructor(
        private loginUserUseCase: LoginUser,
        private refreshAccessToken: RefreshAccessToken,
    ) {}

    loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const email: string = req.body.email;
            const password: string = req.body.password;
            const tokens = await this.loginUserUseCase.execute(email, password);
            if (tokens) {
                res.status(200)
                    .cookie('access_token', tokens.accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                        maxAge: 60 * 60 * 1000,
                    })
                    .cookie('refresh_token', tokens.refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    })
                    .json({ status: 200, message: 'Authenticated' });
            }
        } catch (error) {
            next(error);
        }
    };

    refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                res.status(401).json({ message: 'Refresh token missing' });
                return;
            }

            const accessToken = await this.refreshAccessToken.execute(refreshToken);
            res.status(200)
                .cookie('access_token', accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 60 * 60 * 1000,
                })
                .json({ message: 'Authenticated' });
        } catch (error) {
            next(error);
        }
    };

    logout = async (_req: Request, res: Response): Promise<void> => {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.status(200).json({ message: 'Logout successful' });
    };
}
