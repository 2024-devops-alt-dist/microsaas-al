import { IImageRepository } from 'api/src/interfaces/repositories/IImageRepository';

export class DeleteImage {
    constructor(private imageRepository: IImageRepository) {}

    async execute(id: number): Promise<void> {
        await this.imageRepository.delete(id);
    }
}
