/*
  Warnings:

  - Added the required column `orderGroupId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderGroupId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Order_orderGroupId_idx" ON "Order"("orderGroupId");
