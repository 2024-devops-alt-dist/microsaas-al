import { JwtPayload } from 'jsonwebtoken';

export interface IAuthService {
    comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    generateAccessToken(payload: object): string;
    generateRefreshToken(payload: object): string;
    verifyAccessToken(accessToken: string): JwtPayload | string;
    verifyRefreshToken(refreshToken: string): JwtPayload | string;
}
