import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: '.',
    testMatch: ['<rootDir>/src/**/*.test.tsx'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
