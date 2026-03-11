import { z } from 'zod';

export const createObservationSchema = z.object({
    title: z.string().min(1).max(100),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    quantity: z.number().int().positive(),
    notes: z.string().max(500).nullable().optional(),
    isPublic: z.boolean(),
    confidenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    userId: z.number().int().positive(),
    mushroomId: z.number().int().positive().nullable().optional(),
});

export const updateObservationSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
        })
        .optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    quantity: z.number().int().positive().optional(),
    notes: z.string().max(500).nullable().optional(),
    isPublic: z.boolean().optional(),
    confidenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
});
