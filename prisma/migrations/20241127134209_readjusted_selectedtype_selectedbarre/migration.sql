/*
  Warnings:

  - You are about to drop the column `selectedBaseId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `selectedTailleId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Base` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Taille` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_selectedBaseId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_selectedTailleId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "selectedBaseId",
DROP COLUMN "selectedTailleId",
ADD COLUMN     "selectedBaseName" TEXT,
ADD COLUMN     "selectedTailleName" TEXT,
ADD COLUMN     "selectedType" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Base_name_key" ON "Base"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Taille_name_key" ON "Taille"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_selectedBaseName_fkey" FOREIGN KEY ("selectedBaseName") REFERENCES "Base"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_selectedTailleName_fkey" FOREIGN KEY ("selectedTailleName") REFERENCES "Taille"("name") ON DELETE SET NULL ON UPDATE CASCADE;
