/*
  Warnings:

  - You are about to drop the `quote_requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "quote_requests" DROP CONSTRAINT "quote_requests_clientId_fkey";

-- DropForeignKey
ALTER TABLE "quote_requests" DROP CONSTRAINT "quote_requests_orderId_fkey";

-- DropTable
DROP TABLE "quote_requests";

-- DropEnum
DROP TYPE "QuoteStatus";

-- DropEnum
DROP TYPE "QuoteType";
