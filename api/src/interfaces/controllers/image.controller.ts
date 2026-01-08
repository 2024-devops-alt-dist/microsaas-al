import { CreateImage } from 'api/src/usecases/image/createImage';
import { DeleteImage } from 'api/src/usecases/image/deletImage';
import { FindAllImages } from 'api/src/usecases/image/findAllImages';
import { FindImageById } from 'api/src/usecases/image/findImageById';
import { UpdateImage } from 'api/src/usecases/image/updateImage';
import { Request, Response, NextFunction } from 'express';

export class ImageController {
    constructor(
        private findAllImageUseCase: FindAllImages,
        private findImageByIdUseCase: FindImageById,
        private createImageUseCase: CreateImage,
        private updateImageUseCase: UpdateImage,
        private deleteImageUseCase: DeleteImage,
    ) {}

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const images = await this.findAllImageUseCase.execute();
            res.status(200).json(images);
        } catch (error) {
            next(error);
        }
    };
    findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const image = await this.findImageByIdUseCase.execute(Number(req.params.id));
            if (image) res.status(200).json(image);
            else res.status(404).json({ message: 'Image not found' });
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newImage = await this.createImageUseCase.execute(req.body);
            res.status(201).json(newImage);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updatedImage = await this.updateImageUseCase.execute(
                Number(req.params.id),
                req.body,
            );
            res.status(200).json(updatedImage);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.deleteImageUseCase.execute(Number(req.params.id));
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}
