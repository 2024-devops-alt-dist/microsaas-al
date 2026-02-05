import { jest } from '@jest/globals';
import { FindUserById } from '../../../../src/usecases/user/findUserById';

export const mockFindUserById = {
    execute: jest.fn(),
} as unknown as FindUserById;
