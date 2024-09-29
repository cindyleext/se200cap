/*
  Warnings:

  - You are about to drop the column `policyTypeName` on the `Policy` table. All the data in the column will be lost.
  - Added the required column `policyType` to the `Policy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "policyTypeName",
ADD COLUMN     "policyType" TEXT NOT NULL;
