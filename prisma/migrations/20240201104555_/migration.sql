/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_image_key" ON "Favorite"("image");
