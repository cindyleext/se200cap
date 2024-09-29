/*
  Warnings:

  - You are about to drop the column `policyTypeId` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the `PolicyType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `policyTypeName` to the `Policy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "policyTypeId",
ADD COLUMN     "policyTypeName" TEXT NOT NULL;

-- DropTable
DROP TABLE "PolicyType";
