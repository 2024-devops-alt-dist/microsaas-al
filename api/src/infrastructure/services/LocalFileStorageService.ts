import fs from 'fs/promises';
import path from 'path';
import { IFileStorageService, UploadedFile } from '../../domain/services/IUploadedFile.js';

export class LocalFileStorageService implements IFileStorageService {
    // Multer a déjà écrit le fichier sur le disque.
    // On se contente de mapper les métadonnées vers notre objet domaine.
    save(file: Express.Multer.File): UploadedFile {
        return {
            filename: file.filename, // Nom UUID généré par Multer
            originalName: file.originalname, // Nom d'origine
            mimeType: file.mimetype, // Type MIME
            size: file.size, // Taille en octets
            url: `/uploads/${file.filename}`, // URL relative pour accès HTTP
        };
    }

    // Suppression physique du fichier sur le disque
    async delete(filename: string): Promise<void> {
        const filePath = path.resolve('uploads', filename);

        // Vérification de sécurité : empêcher le path traversal
        // Un attaquant pourrait envoyer "../../etc/passwd" comme filename
        const resolvedPath = path.resolve('uploads', filename);
        const uploadsDir = path.resolve('uploads');

        if (!resolvedPath.startsWith(uploadsDir)) {
            throw new Error('Invalid file path');
        }

        await fs.unlink(filePath);
    }
}
