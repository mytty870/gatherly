/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarUrl" TEXT,
ALTER COLUMN "userName" DROP NOT NULL,
ALTER COLUMN "displayName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";
