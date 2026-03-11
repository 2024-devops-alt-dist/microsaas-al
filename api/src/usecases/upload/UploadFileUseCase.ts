import { IFileStorageService, UploadedFile } from '../../domain/services/IUploadedFile.js';

export class UploadFileUseCase {

  // Injection de dépendance via le constructeur.
  // Le use case dépend de l'INTERFACE (port), pas de l'implémentation.
  constructor(private readonly fileStorageService: IFileStorageService) {}

  execute(file: Express.Multer.File): UploadedFile {

    // Règle métier 1 : vérifier que le fichier existe
    if (!file) {
      throw new Error("Aucun fichier fourni");
    }

    // Règle métier 2 : taille maximale (double vérification après Multer)
    // Multer peut être contourné dans certains cas, la defense-in-depth
    // impose une validation côté métier également.
    const maxSize = 5 * 1024 * 1024; // 5 Mo
    if (file.size > maxSize) {
      throw new Error(`Le fichier dépasse la taille maximale de 5 Mo`);
    }

    // Règle métier 3 : types autorisés
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error(`Type de fichier non autorisé : ${file.mimetype}`);
    }

    // Déléguer le stockage au service
    return this.fileStorageService.save(file);
  }
}

// Pourquoi dupliquer les validations déjà présentes dans Multer ?

// // C'est le principe de defense-in-depth. Multer est un middleware HTTP : il peut être reconfiguré, bypassé ou remplacé. Le use case est la dernière ligne de défense avant le stockage.