// Représentation d'un fichier uploadé dans le domaine
export interface UploadedFile {
    filename: string; // Nom unique sur le disque
    originalName: string; // Nom original envoyé par le client
    mimeType: string; // Type MIME (image/png, etc.)
    size: number; // Taille en octets
    url: string; // URL d'accès au fichier
}

// Contrat du service de stockage
export interface IFileStorageService {
    save(file: Express.Multer.File): UploadedFile;
    delete(filename: string): Promise<void>;
}
