-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_url_key" ON "Favorite"("url");
