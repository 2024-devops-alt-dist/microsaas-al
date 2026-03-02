import { JwtPayload } from 'jsonwebtoken';
import { AuthService } from '../../infrastructure/services/AuthService.js';

export class ConnectedUserInformation {
    constructor(private authService: AuthService) {}

    async execute(accessToken: string): Promise<JwtPayload | string> {
        return this.authService.verifyAccessToken(accessToken);
    }
}
