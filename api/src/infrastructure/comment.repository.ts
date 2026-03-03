import { Status as DomainStatus, Status } from '../domain/constant/status.js';
import { Comment } from '../domain/entities/Comment.js';
import { CommentCreationType } from '../domain/types/CommentCreationType.js';
import { Prisma, Comment as CommentPrisma } from './database/prisma/generated/prisma/client.js';
import { prisma } from './database/prisma/prisma.js';

export class CommentRepository {
    async findAll(): Promise<Comment[]> {
        const comments = await prisma.comment.findMany();
        const commentEntities: Comment[] = [];
        for (const comment of comments) {
            commentEntities.push(this.mapPrismaCommentToDomain(comment));
        }
        return commentEntities;
    }

    async findById(id: number): Promise<Comment | null> {
        const comment = await prisma.comment.findUnique({
            where: {
                id,
            },
        });
        return comment ? this.mapPrismaCommentToDomain(comment) : null;
    }

    async create(commentCreationType: CommentCreationType): Promise<Comment> {
        const commentPrisma = {
            content: commentCreationType.content,
            status: commentCreationType.status as Status,
            userId: commentCreationType.userId,
            observationId: commentCreationType.observationId,
        };
        const createdComment = await prisma.comment.create({ data: commentPrisma });
        return this.mapPrismaCommentToDomain(createdComment);
    }

    async update(id: number, data: Partial<Comment>): Promise<Comment> {
        const commentPrisma: Prisma.CommentUpdateInput = {};
        if (data.content !== undefined) commentPrisma.content = data.content;
        if (data.status !== undefined) commentPrisma.status = data.status;
        const comment = await prisma.comment.update({
            where: { id },
            data: commentPrisma,
        });
        return this.mapPrismaCommentToDomain(comment);
    }

    async delete(id: number): Promise<void> {
        await prisma.comment.delete({
            where: { id },
        });
    }

    private mapStatusToDomain(status: string): DomainStatus {
        if (status === 'DRAFT') return DomainStatus.DRAFT;
        if (status === 'SUBMITTED') return DomainStatus.SUBMITTED;
        if (status === 'APPROVED') return DomainStatus.APPROVED;
        return DomainStatus.REJECTED;
    }

    private mapPrismaCommentToDomain(prismaComment: CommentPrisma): Comment {
        return new Comment(
            prismaComment.id,
            prismaComment.content,
            this.mapStatusToDomain(prismaComment.status),
            prismaComment.createdAt,
            prismaComment.updatedAt,
            prismaComment.userId,
            prismaComment.observationId,
        );
    }
}
