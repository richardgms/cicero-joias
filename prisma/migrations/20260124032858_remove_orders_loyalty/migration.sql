/*
  Warnings:

  - You are about to drop the column `clerk_user_id` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `loyaltyLevel` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `loyaltyPoints` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the `coupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loyalty_transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_attachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_status_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userId_fkey";

-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_clientId_fkey";

-- DropForeignKey
ALTER TABLE "loyalty_transactions" DROP CONSTRAINT "loyalty_transactions_clientId_fkey";

-- DropForeignKey
ALTER TABLE "order_attachments" DROP CONSTRAINT "order_attachments_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_status_history" DROP CONSTRAINT "order_status_history_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_clientId_fkey";

-- DropIndex
DROP INDEX "clients_clerk_user_id_key";

-- DropIndex
DROP INDEX "clients_userId_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "clerk_user_id",
DROP COLUMN "loyaltyLevel",
DROP COLUMN "loyaltyPoints",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "clientId" TEXT;

-- DropTable
DROP TABLE "coupons";

-- DropTable
DROP TABLE "loyalty_transactions";

-- DropTable
DROP TABLE "order_attachments";

-- DropTable
DROP TABLE "order_status_history";

-- DropTable
DROP TABLE "orders";

-- DropEnum
DROP TYPE "AttachmentType";

-- DropEnum
DROP TYPE "CouponType";

-- DropEnum
DROP TYPE "LoyaltyLevel";

-- DropEnum
DROP TYPE "LoyaltyType";

-- DropEnum
DROP TYPE "OrderCategory";

-- DropEnum
DROP TYPE "OrderStatus";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
