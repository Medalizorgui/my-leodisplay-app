/*
  Warnings:

  - You are about to drop the column `selectedBase` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `selectedTaille` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `selectedType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `barre` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "selectedBase",
DROP COLUMN "selectedTaille",
DROP COLUMN "selectedType",
ADD COLUMN     "selectedBaseId" INTEGER,
ADD COLUMN     "selectedTailleId" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "barre",
DROP COLUMN "type";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_selectedBaseId_fkey" FOREIGN KEY ("selectedBaseId") REFERENCES "Base"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_selectedTailleId_fkey" FOREIGN KEY ("selectedTailleId") REFERENCES "Taille"("id") ON DELETE SET NULL ON UPDATE CASCADE;
