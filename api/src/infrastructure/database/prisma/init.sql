-- =============================================
-- SUPPRESSION DES TABLES EXISTANTES
-- =============================================
DROP TABLE IF EXISTS "Comment" CASCADE;
DROP TABLE IF EXISTS "Image" CASCADE;
DROP TABLE IF EXISTS "Observation" CASCADE;
DROP TABLE IF EXISTS "Mushroom" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- =============================================
-- SUPPRESSION DES TYPES ENUM EXISTANTS
-- =============================================
DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "ConfidenceLevel" CASCADE;
DROP TYPE IF EXISTS "Edibility" CASCADE;
DROP TYPE IF EXISTS "Status" CASCADE;

-- =============================================
-- CRÉATION DES TYPES ENUM
-- =============================================
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');
CREATE TYPE "ConfidenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "Edibility" AS ENUM ('EDIBLE', 'INEDIBLE', 'POISONOUS', 'DEADLY', 'UNKNOWN');
CREATE TYPE "Status" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED');

-- =============================================
-- CRÉATION DE LA TABLE USER
-- =============================================
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    role "Role" DEFAULT 'USER' NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =============================================
-- CRÉATION DE LA TABLE MUSHROOM
-- =============================================
CREATE TABLE "Mushroom" (
    id SERIAL PRIMARY KEY,
    "commonName" VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    genus VARCHAR(255) NOT NULL,
    family VARCHAR(255) NOT NULL,
    edibility "Edibility" NOT NULL,
    habitat VARCHAR(255),
    description TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =============================================
-- CRÉATION DE LA TABLE OBSERVATION
-- =============================================
CREATE TABLE "Observation" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    quantity INT NOT NULL,
    notes TEXT,
    "isPublic" BOOLEAN DEFAULT FALSE NOT NULL,
    "confidenceLevel" "ConfidenceLevel" NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "userId" INT NOT NULL,
    "mushroomId" INT,
    CONSTRAINT fk_observation_user FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    CONSTRAINT fk_observation_mushroom FOREIGN KEY ("mushroomId") REFERENCES "Mushroom"(id) ON DELETE SET NULL
);

-- =============================================
-- CRÉATION DE LA TABLE IMAGE
-- =============================================
CREATE TABLE "Image" (
    id SERIAL PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL,
    size INT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "observationId" INT,
    "mushroomId" INT,
    CONSTRAINT fk_image_observation FOREIGN KEY ("observationId") REFERENCES "Observation"(id) ON DELETE CASCADE,
    CONSTRAINT fk_image_mushroom FOREIGN KEY ("mushroomId") REFERENCES "Mushroom"(id) ON DELETE CASCADE
);

-- =============================================
-- CRÉATION DE LA TABLE COMMENT
-- =============================================
CREATE TABLE "Comment" (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    status "Status" NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "userId" INT NOT NULL,
    "observationId" INT NOT NULL,
    CONSTRAINT fk_comment_user FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_observation FOREIGN KEY ("observationId") REFERENCES "Observation"(id) ON DELETE CASCADE
);

-- =============================================
-- CRÉATION DES INDEX
-- =============================================
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_observation_user ON "Observation"("userId");
CREATE INDEX idx_observation_mushroom ON "Observation"("mushroomId");
CREATE INDEX idx_observation_public ON "Observation"("isPublic");
CREATE INDEX idx_comment_observation ON "Comment"("observationId");
CREATE INDEX idx_comment_user ON "Comment"("userId");
CREATE INDEX idx_image_observation ON "Image"("observationId");
CREATE INDEX idx_image_mushroom ON "Image"("mushroomId");

-- =============================================
-- INSERTION DES DONNÉES : USERS
-- Hash bcrypt de 'admin123' et 'password123'
-- =============================================
INSERT INTO "User" (email, password, username, firstname, lastname, role, "createdAt", "updatedAt") VALUES
('admin@admin.com', '$2b$10$rIC/M8Q9X5F5OB5nXvLQp.xqKQYE5kqTn/xQV0nOqE9IQYi5rw0Hy', 'admin', 'Admin', 'User', 'ADMIN', NOW(), NOW()),
('bob@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'bob02', 'Bob', 'Martin', 'USER', NOW(), NOW()),
('carol@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'carol03', 'Carol', 'Bernard', 'USER', NOW(), NOW()),
('david@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'david04', 'David', 'Leroy', 'USER', NOW(), NOW()),
('emma@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'emma05', 'Emma', 'Moreau', 'USER', NOW(), NOW()),
('frank@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'frank06', 'Frank', 'Petit', 'USER', NOW(), NOW()),
('grace@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'grace07', 'Grace', 'Roux', 'USER', NOW(), NOW()),
('henry@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'henry08', 'Henry', 'Fabre', 'USER', NOW(), NOW()),
('irene@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'irene09', 'Irene', 'Gautier', 'USER', NOW(), NOW()),
('alice@example.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'alice01', 'Alice', 'Dupont', 'USER', NOW(), NOW());

-- =============================================
-- INSERTION DES DONNÉES : MUSHROOMS
-- =============================================
INSERT INTO "Mushroom" ("commonName", species, genus, family, edibility, habitat, description, "createdAt", "updatedAt") VALUES
('Champignon de Paris', 'Agaricus bisporus', 'Agaricus', 'Agaricaceae', 'EDIBLE', 'Pelouse', 'Champignon comestible commun cultivé dans le monde entier', NOW(), NOW()),
('Girolle', 'Cantharellus cibarius', 'Cantharellus', 'Cantharellaceae', 'EDIBLE', 'Forêt de feuillus', 'Champignon jaune doré très apprécié en cuisine', NOW(), NOW()),
('Cèpe de Bordeaux', 'Boletus edulis', 'Boletus', 'Boletaceae', 'EDIBLE', 'Forêt mixte', 'Champignon brun au chapeau charnu, très recherché', NOW(), NOW()),
('Amanite tue-mouches', 'Amanita muscaria', 'Amanita', 'Amanitaceae', 'POISONOUS', 'Forêt de conifères', 'Champignon toxique rouge à points blancs, emblématique', NOW(), NOW()),
('Pleurote', 'Pleurotus ostreatus', 'Pleurotus', 'Pleurotaceae', 'EDIBLE', 'Tronc d''arbre mort', 'Champignon comestible en forme d''huître, cultivé', NOW(), NOW()),
('Morille', 'Morchella esculenta', 'Morchella', 'Morchellaceae', 'EDIBLE', 'Lisière de forêt', 'Champignon printanier au chapeau alvéolé très prisé', NOW(), NOW()),
('Agaric jaunissant', 'Agaricus xanthodermus', 'Agaricus', 'Agaricaceae', 'POISONOUS', 'Pelouse, jardins', 'Champignon toxique à odeur d''encre caractéristique', NOW(), NOW()),
('Tricholome équestre', 'Tricholoma equestre', 'Tricholoma', 'Tricholomataceae', 'DEADLY', 'Forêt de pins', 'Autrefois considéré comestible, maintenant reconnu mortel', NOW(), NOW()),
('Chanterelle en tube', 'Cantharellus tubaeformis', 'Cantharellus', 'Cantharellaceae', 'EDIBLE', 'Forêt humide', 'Petit champignon brun-jaune en forme de trompette', NOW(), NOW()),
('Coprin chevelu', 'Coprinus comatus', 'Coprinus', 'Coprinaceae', 'EDIBLE', 'Pelouse, bord de route', 'Champignon comestible jeune, se liquéfie en vieillissant', NOW(), NOW());

-- =============================================
-- INSERTION DES DONNÉES : OBSERVATIONS
-- =============================================
INSERT INTO "Observation" (title, date, latitude, longitude, quantity, notes, "isPublic", "confidenceLevel", "createdAt", "updatedAt", "userId", "mushroomId") VALUES
('Champignons de Paris en pelouse', '2025-09-15'::timestamp, 48.856613, 2.352222, 5, 'Trouvés dans le parc, belle colonie', TRUE, 'HIGH', NOW(), NOW(), 1, 1),
('Girolles en forêt de Fontainebleau', '2025-09-20'::timestamp, 48.4009, 2.6988, 12, 'Sous chênes centenaires, excellente récolte', TRUE, 'HIGH', NOW(), NOW(), 2, 2),
('Cèpes près du ruisseau', '2025-10-01'::timestamp, 45.7640, 4.8357, 3, 'Spécimens de belle taille', FALSE, 'MEDIUM', NOW(), NOW(), 3, 3),
('Amanites en sous-bois', '2025-10-05'::timestamp, 48.8566, 2.3522, 7, 'Attention, ne pas consommer !', TRUE, 'HIGH', NOW(), NOW(), 4, 4),
('Pleurotes sur tronc de hêtre', '2025-10-10'::timestamp, 47.3220, 5.0415, 15, 'Belle grappe sur arbre mort', TRUE, 'HIGH', NOW(), NOW(), 5, 5),
('Morilles printanières', '2025-04-12'::timestamp, 48.1173, 7.3580, 4, 'Premières de la saison', FALSE, 'MEDIUM', NOW(), NOW(), 6, 6),
('Agarics suspects dans le jardin', '2025-09-25'::timestamp, 43.6047, 1.4442, 8, 'Odeur désagréable, probablement toxiques', TRUE, 'LOW', NOW(), NOW(), 7, 7),
('Tricholomes en pinède', '2025-11-02'::timestamp, 44.8378, -0.5792, 2, 'Ne pas consommer, espèce dangereuse', TRUE, 'MEDIUM', NOW(), NOW(), 8, 8),
('Chanterelles en tube', '2025-10-20'::timestamp, 45.1885, 5.7245, 25, 'Nombreux spécimens dans la mousse', TRUE, 'HIGH', NOW(), NOW(), 9, 9),
('Coprins au bord du chemin', '2025-10-08'::timestamp, 48.5734, 7.7521, 6, 'Jeunes spécimens parfaits pour la cuisine', TRUE, 'HIGH', NOW(), NOW(), 10, 10);

-- =============================================
-- INSERTION DES DONNÉES : COMMENTS
-- =============================================
INSERT INTO "Comment" (content, status, "createdAt", "updatedAt", "userId", "observationId") VALUES
('Superbe trouvaille ! Les champignons de Paris sauvages sont rares.', 'APPROVED', NOW(), NOW(), 2, 1),
('Je confirme l''identification, ce sont bien des girolles.', 'APPROVED', NOW(), NOW(), 3, 2),
('Attention à bien vérifier, les cèpes peuvent être confondus avec des bolets amers.', 'APPROVED', NOW(), NOW(), 4, 3),
('Belle photo ! Ces amanites sont magnifiques mais très dangereuses.', 'APPROVED', NOW(), NOW(), 5, 4),
('Les pleurotes sont excellents en cuisine, bonne récolte !', 'APPROVED', NOW(), NOW(), 6, 5),
('Les morilles doivent toujours être bien cuites avant consommation.', 'SUBMITTED', NOW(), NOW(), 7, 6),
('Effectivement, l''odeur d''encre est caractéristique de l''agaric jaunissant.', 'APPROVED', NOW(), NOW(), 8, 7),
('Cette espèce a causé des décès, merci pour l''avertissement.', 'APPROVED', NOW(), NOW(), 9, 8),
('Magnifique spot ! Tu peux partager la localisation exacte ?', 'REJECTED', NOW(), NOW(), 10, 9),
('Les coprins doivent être consommés très frais, bon appétit !', 'DRAFT', NOW(), NOW(), 1, 10);

-- =============================================
-- INSERTION DES DONNÉES : IMAGES
-- =============================================
INSERT INTO "Image" (url, filename, "mimeType", size, "createdAt", "updatedAt", "observationId", "mushroomId") VALUES
('agaricus_bisporus_01.webp', 'agaricus_bisporus_01.webp', 'image/webp', 125000, NOW(), NOW(), 1, 1),
('cantharellus_cibarius_01.webp', 'cantharellus_cibarius_01.webp', 'image/webp', 230000, NOW(), NOW(), 2, 2),
('boletus_edulis_01.jpg', 'boletus_edulis_01.jpg', 'image/jpeg', 345000, NOW(), NOW(), 3, 3),
('amanita_muscaria_01.jpg', 'amanita_muscaria_01.jpg', 'image/jpeg', 450000, NOW(), NOW(), 4, 4),
('pleurotus_ostreatus_01.jpg', 'pleurotus_ostreatus_01.jpg', 'image/jpeg', 280000, NOW(), NOW(), 5, 5),
('morchella_esculenta_01.webp', 'morchella_esculenta_01.webp', 'image/webp', 195000, NOW(), NOW(), 6, 6),
('agaricus_xanthodermus_01.webp', 'agaricus_xanthodermus_01.webp', 'image/webp', 175000, NOW(), NOW(), 7, 7),
('tricholoma_equestre_01.webp', 'tricholoma_equestre_01.webp', 'image/webp', 210000, NOW(), NOW(), 8, 8),
('cantharellus_tubaeformis_01.jpeg', 'cantharellus_tubaeformis_01.jpeg', 'image/jpeg', 165000, NOW(), NOW(), 9, 9),
('coprinus_comatus_01.webp', 'coprinus_comatus_01.webp', 'image/webp', 145000, NOW(), NOW(), 10, 10),
('agaricus_bisporus_ref.webp', 'agaricus_bisporus_ref.webp', 'image/webp', 95000, NOW(), NOW(), NULL, 1),
('cantharellus_cibarius_ref.webp', 'cantharellus_cibarius_ref.webp', 'image/webp', 110000, NOW(), NOW(), NULL, 2),
('boletus_edulis_ref.jpg', 'boletus_edulis_ref.jpg', 'image/jpeg', 125000, NOW(), NOW(), NULL, 3),
('amanita_muscaria_ref.jpg', 'amanita_muscaria_ref.jpg', 'image/jpeg', 135000, NOW(), NOW(), NULL, 4),
('pleurotus_ostreatus_ref.jpg', 'pleurotus_ostreatus_ref.jpg', 'image/jpeg', 105000, NOW(), NOW(), NULL, 5);

-- =============================================
-- RÉINITIALISATION DES SÉQUENCES
-- =============================================
SELECT setval(pg_get_serial_sequence('"User"', 'id'), COALESCE((SELECT MAX(id) FROM "User"), 1));
SELECT setval(pg_get_serial_sequence('"Mushroom"', 'id'), COALESCE((SELECT MAX(id) FROM "Mushroom"), 1));
SELECT setval(pg_get_serial_sequence('"Observation"', 'id'), COALESCE((SELECT MAX(id) FROM "Observation"), 1));
SELECT setval(pg_get_serial_sequence('"Comment"', 'id'), COALESCE((SELECT MAX(id) FROM "Comment"), 1));
SELECT setval(pg_get_serial_sequence('"Image"', 'id'), COALESCE((SELECT MAX(id) FROM "Image"), 1));

-- =============================================
-- VÉRIFICATION
-- =============================================
-- SELECT 'Users: ' || COUNT(*) FROM "User";
-- SELECT 'Mushrooms: ' || COUNT(*) FROM "Mushroom";
-- SELECT 'Observations: ' || COUNT(*) FROM "Observation";
-- SELECT 'Comments: ' || COUNT(*) FROM "Comment";
-- SELECT 'Images: ' || COUNT(*) FROM "Image";