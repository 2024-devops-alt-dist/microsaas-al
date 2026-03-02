import dotenv from 'dotenv';
dotenv.config();

interface Env {
    API_PORT: number;
    DATABASE_URL: string;
    FRONT_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
}

function getEnv(): Env {
    const API_PORT = process.env.API_PORT || '3000';
    const DATABASE_URL =
        process.env.DATABASE_URL ||
        'postgresql://postgres:password@localhost:5432/microsaas_db?schema=public';
    const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173';
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    if (!JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
    }

    return {
        API_PORT: Number(API_PORT),
        DATABASE_URL: DATABASE_URL,
        FRONT_URL: FRONT_URL,
        JWT_SECRET,
        JWT_REFRESH_SECRET,
    };
}

export const env = getEnv();
