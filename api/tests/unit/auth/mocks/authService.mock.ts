import { jest } from '@jest/globals';
import { IAuthService } from '../../../../src/domain/services/IAuthService';

export const mockAuthService: jest.Mocked<IAuthService> = {
    comparePasswords: jest.fn(),
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn(),
    verifyAccessToken: jest.fn(),
    verifyRefreshToken: jest.fn(),
};
