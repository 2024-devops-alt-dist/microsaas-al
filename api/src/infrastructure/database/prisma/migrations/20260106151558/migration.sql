/*
  Warnings:

  - The values [CERTAIN,PROBABLE,POSSIBLE] on the enum `ConfidenceLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConfidenceLevel_new" AS ENUM ('UNKNOWN', 'LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "Observation" ALTER COLUMN "confidenceLevel" TYPE "ConfidenceLevel_new" USING ("confidenceLevel"::text::"ConfidenceLevel_new");
ALTER TYPE "ConfidenceLevel" RENAME TO "ConfidenceLevel_old";
ALTER TYPE "ConfidenceLevel_new" RENAME TO "ConfidenceLevel";
DROP TYPE "public"."ConfidenceLevel_old";
COMMIT;
