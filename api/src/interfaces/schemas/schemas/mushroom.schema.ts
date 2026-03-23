import { z } from 'zod';

export const createMushroomSchema = z.object({
    commonName: z.string().min(1).max(100),
    species: z.string().min(1).max(100),
    genus: z.string().min(1).max(100),
    family: z.string().min(1).max(100),
    edibility: z.enum(['EDIBLE', 'INEDIBLE', 'POISONOUS', 'DEADLY', 'UNKNOWN']),
    habitat: z.string().max(255).nullable().optional(),
    description: z.string().max(1000).nullable().optional(),
});

export const updateMushroomSchema = z.object({
    commonName: z.string().min(1).max(100).optional(),
    species: z.string().min(1).max(100).optional(),
    genus: z.string().min(1).max(100).optional(),
    family: z.string().min(1).max(100).optional(),
    edibility: z.enum(['EDIBLE', 'INEDIBLE', 'POISONOUS', 'DEADLY', 'UNKNOWN']).optional(),
    habitat: z.string().max(255).nullable().optional(),
    description: z.string().max(1000).nullable().optional(),
});
