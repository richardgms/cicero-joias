-- O campo status não era usado: o que decide se o item aparece no site é isActive.
-- AlterTable
ALTER TABLE "portfolio_items" DROP COLUMN "status";
