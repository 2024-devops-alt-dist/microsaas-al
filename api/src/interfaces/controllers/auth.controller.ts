import { Request, Response, NextFunction } from 'express';
import { LoginUser } from '../../usecases/auth/loginUser.js';

export class AuthController {
    constructor(private loginUserUseCase: LoginUser) {}

    loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const email: string = req.body.email;
            const password: string = req.body.password;
            const accessToken = await this.loginUserUseCase.execute(email, password);
            if (accessToken) {
                res.status(200)
                    .cookie('access_token', accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                        maxAge: 60 * 60 * 1000,
                    })
                    .json({ status: 200, message: 'Authenticated' });
            }
        } catch (error) {
            next(error);
        }
    };
}
