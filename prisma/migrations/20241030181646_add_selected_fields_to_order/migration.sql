/*
  Warnings:

  - Added the required column `selectedBarre` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedBase` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedTaille` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "selectedBarre" TEXT NOT NULL,
ADD COLUMN     "selectedBase" TEXT NOT NULL,
ADD COLUMN     "selectedTaille" TEXT NOT NULL,
ADD COLUMN     "selectedType" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Order_productId_idx" ON "Order"("productId");

-- CreateIndex
CREATE INDEX "Order_email_idx" ON "Order"("email");
