import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128, 'Le mot de passe ne doit pas dépasser 128 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial');

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export const registerSchema = z.object({
    email: z.email(),
    password: passwordSchema,
    username: z.string().min(2).max(50),
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
});
