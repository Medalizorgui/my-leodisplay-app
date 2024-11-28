/*
  Warnings:

  - You are about to drop the column `quantity` on the `Base` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Taille` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Base" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Taille" DROP COLUMN "quantity";
