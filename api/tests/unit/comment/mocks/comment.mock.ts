import { Status } from 'api/src/domain/constant/status';

export const mockComment1 = {
    id: 1,
    content: 'This is a mock comment',
    status: Status.APPROVED,
    createdAt: new Date('2023-05-01T00:00:00Z'),
    updatedAt: new Date('2023-05-01T00:00:00Z'),
    userId: 1,
    observationId: 1,
};

export const mockComment2 = {
    id: 2,
    content: 'This is another mock comment',
    status: Status.SUBMITTED,
    createdAt: new Date('2023-06-01T00:00:00Z'),
    updatedAt: new Date('2023-06-01T00:00:00Z'),
    userId: 2,
    observationId: 1,
};
