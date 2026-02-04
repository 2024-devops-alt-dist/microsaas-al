import { env } from '../../config/env.js';
import { IAuthService } from '../../domain/services/IAuthService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService implements IAuthService {
    async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    generateToken(payload: object): string {
        const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}
