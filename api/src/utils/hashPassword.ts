import bcrypt from 'bcrypt';

export async function hashPassword(plain: string, rounds = 10): Promise<string> {
    return bcrypt.hash(plain, rounds);
}
