/*
  Warnings:

  - You are about to drop the column `hash` on the `exam_slots` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `exam_slots` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[wordId,category,examType,date]` on the table `exam_slots` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `exam_slots` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `examType` on the `exam_slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `examType` on the `subscriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('THEORY', 'PRACTICE');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "exam_slots_hash_key";

-- DropIndex
DROP INDEX "exam_slots_wordId_category_examType_date_idx";

-- AlterTable
ALTER TABLE "exam_slots" DROP COLUMN "hash",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "examType",
ADD COLUMN     "examType" "ExamType" NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "examType",
ADD COLUMN     "examType" "ExamType" NOT NULL;

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provinces" (
    "id" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_centers" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "provinceId" TEXT,

    CONSTRAINT "exam_centers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_tokenHash_key" ON "sessions"("tokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_deviceId_key" ON "sessions"("userId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_externalId_key" ON "provinces"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "exam_centers_externalId_key" ON "exam_centers"("externalId");

-- CreateIndex
CREATE INDEX "exam_slots_wordId_category_examType_idx" ON "exam_slots"("wordId", "category", "examType");

-- CreateIndex
CREATE UNIQUE INDEX "exam_slots_wordId_category_examType_date_key" ON "exam_slots"("wordId", "category", "examType", "date");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("deviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "exam_centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_slots" ADD CONSTRAINT "exam_slots_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "exam_centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_centers" ADD CONSTRAINT "exam_centers_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
