import { z } from 'zod';

export const createImageSchema = z.object({
    url: z.string().url(),
    filename: z.string().min(1).max(255),
    mimeType: z.string().min(1).max(50),
    size: z.number().int().positive(),
    observationId: z.number().int().positive().nullable(),
    mushroomId: z.number().int().positive().nullable(),
});

export const updateImageSchema = z.object({
    url: z.string().url().optional(),
    filename: z.string().min(1).max(255).optional(),
    mimeType: z.string().min(1).max(50).optional(),
    size: z.number().int().positive().optional(),
});
