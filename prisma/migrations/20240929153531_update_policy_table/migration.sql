/*
  Warnings:

  - You are about to drop the column `policyType` on the `Policy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "policyType";

-- CreateTable
CREATE TABLE "PolicyType" (
    "id" SERIAL NOT NULL,
    "policyTypeName" TEXT NOT NULL,

    CONSTRAINT "PolicyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyPolicyType" (
    "policyId" INTEGER NOT NULL,
    "policyTypeId" INTEGER NOT NULL,

    CONSTRAINT "PolicyPolicyType_pkey" PRIMARY KEY ("policyId","policyTypeId")
);

-- AddForeignKey
ALTER TABLE "PolicyPolicyType" ADD CONSTRAINT "PolicyPolicyType_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyPolicyType" ADD CONSTRAINT "PolicyPolicyType_policyTypeId_fkey" FOREIGN KEY ("policyTypeId") REFERENCES "PolicyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
