import { z } from 'zod';

export const createCommentSchema = z.object({
    content: z.string().min(1).max(1000),
    status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']),
    userId: z.number().int().positive(),
    observationId: z.number().int().positive(),
});

export const updateCommentSchema = z.object({
    content: z.string().min(1).max(1000).optional(),
    status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']).optional(),
});
