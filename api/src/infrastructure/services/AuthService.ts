import { env } from '../../config/env.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class AuthService implements IAuthService {
    async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    generateAccessToken(payload: object): string {
        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }

    verifyAccessToken(accessToken: string): JwtPayload | string {
        return jwt.verify(accessToken, env.JWT_SECRET);
    }

    verifyRefreshToken(refreshToken: string): JwtPayload | string {
        return jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    }
}
