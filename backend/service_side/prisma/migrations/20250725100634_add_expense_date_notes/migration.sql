/*
  Warnings:

  - Added the required column `date` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "settledAt" TIMESTAMP(3);
