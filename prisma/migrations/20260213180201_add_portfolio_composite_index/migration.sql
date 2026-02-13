-- CreateIndex
CREATE INDEX "portfolio_items_isActive_deletedAt_category_createdAt_idx" ON "portfolio_items"("isActive", "deletedAt", "category", "createdAt");
