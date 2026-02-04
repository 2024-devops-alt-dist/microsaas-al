import { jest } from '@jest/globals';
import { IAuthService } from '../../../../src/domain/services/IAuthService';

export const mockAuthService = (): jest.Mocked<IAuthService> => ({
    comparePasswords: jest.fn(),
    generateToken: jest.fn(),
});
