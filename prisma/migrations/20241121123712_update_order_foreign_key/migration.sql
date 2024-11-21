/*
  Warnings:

  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nom]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productNom` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropIndex
DROP INDEX "Order_productId_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productId",
ADD COLUMN     "productNom" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Order_productNom_idx" ON "Order"("productNom");

-- CreateIndex
CREATE UNIQUE INDEX "Product_nom_key" ON "Product"("nom");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productNom_fkey" FOREIGN KEY ("productNom") REFERENCES "Product"("nom") ON DELETE RESTRICT ON UPDATE CASCADE;
