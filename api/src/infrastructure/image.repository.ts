import { Image } from '../domain/entities/Image.js';
import { ImageCreationType } from '../domain/types/ImageCreationType.js';
import { Prisma, Image as ImagePrisma } from './database/prisma/generated/prisma/client.js';
import { prisma } from './database/prisma/prisma.js';

export class ImageRepository {
    async findAll(): Promise<Image[]> {
        const images = await prisma.image.findMany();
        const imageEntities: Image[] = [];
        for (const image of images) {
            imageEntities.push(this.mapPrismaImageToDomain(image));
        }
        return imageEntities;
    }

    async findById(id: number): Promise<Image | null> {
        const image = await prisma.image.findUnique({
            where: {
                id,
            },
        });
        return image ? this.mapPrismaImageToDomain(image) : null;
    }

    async create(imageCreationType: ImageCreationType): Promise<Image> {
        const imagePrisma = {
            url: imageCreationType.url,
            filename: imageCreationType.filename,
            mimeType: imageCreationType.mimeType,
            size: imageCreationType.size,
            observationId: imageCreationType.observationId,
            mushroomId: imageCreationType.mushroomId,
        };
        const createdImage = await prisma.image.create({ data: imagePrisma });
        return this.mapPrismaImageToDomain(createdImage);
    }

    async update(id: number, data: Partial<Image>): Promise<Image> {
        const imagePrisma: Prisma.ImageUpdateInput = {};
        if (data.url !== null) imagePrisma.url = data.url;
        if (data.filename !== null) imagePrisma.filename = data.filename;
        if (data.mimeType !== null) imagePrisma.mimeType = data.mimeType;
        if (data.size !== null) imagePrisma.size = data.size;
        const image = await prisma.image.update({
            where: { id },
            data: imagePrisma,
        });
        return this.mapPrismaImageToDomain(image);
    }

    async delete(id: number): Promise<void> {
        await prisma.image.delete({
            where: { id },
        });
    }

    private mapPrismaImageToDomain(prismaImage: ImagePrisma): Image {
        return new Image(
            prismaImage.id,
            prismaImage.url,
            prismaImage.filename,
            prismaImage.mimeType,
            prismaImage.size,
            prismaImage.createdAt,
            prismaImage.updatedAt,
            prismaImage.observationId,
            prismaImage.mushroomId,
        );
    }
}
