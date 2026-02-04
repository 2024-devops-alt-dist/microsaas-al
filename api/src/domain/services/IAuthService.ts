export interface IAuthService {
    comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    generateToken(payload: object): string;
}
