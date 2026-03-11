import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

// Configuration du stockage sur disque
const storage = multer.diskStorage({

  // 1. Définir le dossier de destination
  //    - req : la requête HTTP entrante
  //    - file : les métadonnées du fichier (nom original, MIME type, etc.)
  //    - cb : callback(erreur, chemin) — pattern Node.js classique
  destination: (_req, _file, cb) => {
    cb(null, path.resolve("uploads"));
  },

  // 2. Définir le nom du fichier sur le disque
  //    On utilise un UUID v4 pour garantir l'unicité et éviter :
  //    - Les collisions de noms
  //    - Les attaques par path traversal via un nom malicieux
  //    On conserve l'extension originale pour que le fichier reste exploitable
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname); // ex: ".png", ".pdf"
    const uniqueName = `${randomUUID()}${ext}`;  // ex: "a1b2c3d4-...-e5f6.png"
    cb(null, uniqueName);
  },
});

// 3. Filtre de type MIME
//    Ce filtre est exécuté AVANT l'écriture sur disque.
//    Il rejette les fichiers dont le type MIME n'est pas dans la liste blanche.
const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accepter le fichier
  } else {
    cb(new Error(`Type MIME non autorisé : ${file.mimetype}`));
  }
};

// 4. Assemblage final de la configuration Multer
export const uploadMiddleware = multer({
  storage,       // Où et comment stocker
  fileFilter,    // Quels fichiers accepter
  limits: {
    fileSize: 5 * 1024 * 1024,  // 5 Mo maximum par fichier
    files: 1,                    // 1 seul fichier par requête
  },
});