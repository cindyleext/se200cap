/*
  Warnings:

  - The primary key for the `PolicyPolicyType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `policyTypeId` on the `PolicyPolicyType` table. All the data in the column will be lost.
  - You are about to drop the `PolicyType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `policyTypeName` to the `PolicyPolicyType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PolicyPolicyType" DROP CONSTRAINT "PolicyPolicyType_policyTypeId_fkey";

-- AlterTable
ALTER TABLE "PolicyPolicyType" DROP CONSTRAINT "PolicyPolicyType_pkey",
DROP COLUMN "policyTypeId",
ADD COLUMN     "policyTypeName" TEXT NOT NULL,
ADD CONSTRAINT "PolicyPolicyType_pkey" PRIMARY KEY ("policyId", "policyTypeName");

-- DropTable
DROP TABLE "PolicyType";
