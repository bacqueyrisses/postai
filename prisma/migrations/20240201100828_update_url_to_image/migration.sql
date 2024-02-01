/*
  Warnings:

  - You are about to drop the column `url` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `image` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "url",
ADD COLUMN     "image" TEXT NOT NULL;
