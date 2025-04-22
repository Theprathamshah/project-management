/*
  Warnings:

  - Added the required column `department` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'private';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isSensitive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'LOW';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clearance" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
