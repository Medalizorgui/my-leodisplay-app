/*
  Warnings:

  - You are about to drop the column `downloadLink` on the `Taille` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Taille" DROP COLUMN "downloadLink",
ADD COLUMN     "downloadLinks" TEXT[],
ADD COLUMN     "ficheTechniqueLink" TEXT;
