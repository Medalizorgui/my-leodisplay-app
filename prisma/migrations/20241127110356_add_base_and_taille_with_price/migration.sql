/*
  Warnings:

  - You are about to drop the column `base` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `taille` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "baseQuantity" INTEGER,
ADD COLUMN     "tailleQuantity" INTEGER,
ALTER COLUMN "selectedBarre" DROP NOT NULL,
ALTER COLUMN "selectedBase" DROP NOT NULL,
ALTER COLUMN "selectedTaille" DROP NOT NULL,
ALTER COLUMN "selectedType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "base",
DROP COLUMN "taille";

-- CreateTable
CREATE TABLE "Base" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taille" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "downloadLink" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Taille_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Base" ADD CONSTRAINT "Base_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taille" ADD CONSTRAINT "Taille_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
