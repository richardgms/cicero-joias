-- AlterEnum
ALTER TYPE "ProductCategory" ADD VALUE 'WEDDING_RINGS';

-- AlterTable
ALTER TABLE "portfolio_items" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "portfolio_items_deletedAt_idx" ON "portfolio_items"("deletedAt");
