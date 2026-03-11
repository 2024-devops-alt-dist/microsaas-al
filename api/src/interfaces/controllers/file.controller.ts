import { Request, Response } from "express";
import { UploadFileUseCase } from '../../usecases/upload/UploadFileUseCase.js';

export class FileController {

  constructor(private readonly uploadFileUseCase: UploadFileUseCase) {}

  upload(req: Request, res: Response): void {
    try {
      // req.file est injecté par Multer après parsing de la requête multipart
      // Si aucun fichier n'a été envoyé, req.file est undefined
      if (!req.file) {
        res.status(400).json({ error: "Aucun fichier envoyé" });
        return;
      }

      // Appel du use case avec le fichier parsé par Multer
      const result = this.uploadFileUseCase.execute(req.file);

      // Réponse HTTP avec les métadonnées du fichier uploadé
      res.status(201).json({
        message: "Fichier uploadé avec succès",
        file: result,
      });

    } catch (error: unknown) {
      // On ne renvoie jamais l'erreur brute en production (information leakage)
      const message = error instanceof Error
        ? error.message
        : "Erreur lors de l'upload";

      res.status(400).json({ error: message });
    }
  }
}