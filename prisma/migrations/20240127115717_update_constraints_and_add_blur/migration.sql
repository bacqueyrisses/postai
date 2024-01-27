/*
  Warnings:

  - Added the required column `blur` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "blur" TEXT NOT NULL;
