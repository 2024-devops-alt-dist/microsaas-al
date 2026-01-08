import dotenv from 'dotenv';
dotenv.config();

interface Env {
    API_PORT: number;
    DATABASE_URL: string;
    FRONT_URL: string;
}

function getEnv(): Env {
    let { API_PORT, DATABASE_URL, FRONT_URL } = process.env;
    if (!API_PORT) API_PORT = '3000';
    if (!DATABASE_URL)
        DATABASE_URL = 'postgresql://postgres:password@localhost:5432/microsaas_db?schema=public';
    if (!FRONT_URL) FRONT_URL = 'http://localhost:5173';

    return {
        API_PORT: Number(API_PORT),
        DATABASE_URL: DATABASE_URL,
        FRONT_URL: FRONT_URL,
    };
}

export const env = getEnv();
