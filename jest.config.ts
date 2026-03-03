import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    projects: ['<rootDir>/client', '<rootDir>/api'],
};

export default config;
