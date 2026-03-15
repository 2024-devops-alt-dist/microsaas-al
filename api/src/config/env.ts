import dotenv from 'dotenv';
dotenv.config();

interface Env {
    API_PORT: number;
    DATABASE_URL: string;
    FRONT_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    NODE_ENV: string;
}

function getEnv(): Env {
    const API_PORT = process.env.API_PORT || '3000';
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined in environment variables');
    }
    const FRONT_URL = process.env.FRONT_URL;
    if (!FRONT_URL) {
        throw new Error('FRONT_URL is not defined in environment variables');
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    if (!JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
    }
    const NODE_ENV = process.env.NODE_ENV || 'development';

    return {
        API_PORT: Number(API_PORT),
        DATABASE_URL: DATABASE_URL,
        FRONT_URL: FRONT_URL,
        JWT_SECRET,
        JWT_REFRESH_SECRET,
        NODE_ENV,
    };
}

export const env = getEnv();
