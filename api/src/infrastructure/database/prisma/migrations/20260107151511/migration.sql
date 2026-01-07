/*
  Warnings:

  - The values [UNKNOWN] on the enum `ConfidenceLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConfidenceLevel_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "Observation" ALTER COLUMN "confidenceLevel" TYPE "ConfidenceLevel_new" USING ("confidenceLevel"::text::"ConfidenceLevel_new");
ALTER TYPE "ConfidenceLevel" RENAME TO "ConfidenceLevel_old";
ALTER TYPE "ConfidenceLevel_new" RENAME TO "ConfidenceLevel";
DROP TYPE "public"."ConfidenceLevel_old";
COMMIT;
