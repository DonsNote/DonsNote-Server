/*
  Warnings:

  - You are about to drop the column `block` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `busking` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `follower` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `member` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `block` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `follow` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Aurh` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "block",
DROP COLUMN "busking",
DROP COLUMN "follower",
DROP COLUMN "member",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "genres" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "artistId",
DROP COLUMN "block",
DROP COLUMN "follow",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Aurh";

-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "acToken" TEXT NOT NULL,
    "reToken" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollowArtist" (
    "userId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "UserFollowArtist_pkey" PRIMARY KEY ("userId","artistId")
);

-- CreateTable
CREATE TABLE "UserBlockArtist" (
    "userId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "UserBlockArtist_pkey" PRIMARY KEY ("userId","artistId")
);

-- CreateTable
CREATE TABLE "ArtistBlockUser" (
    "artistId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ArtistBlockUser_pkey" PRIMARY KEY ("artistId","userId")
);

-- CreateTable
CREATE TABLE "ArtistMember" (
    "artistId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ArtistMember_pkey" PRIMARY KEY ("artistId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_uid_key" ON "Auth"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_userId_key" ON "Artist"("userId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Busking" ADD CONSTRAINT "Busking_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowArtist" ADD CONSTRAINT "UserFollowArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowArtist" ADD CONSTRAINT "UserFollowArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlockArtist" ADD CONSTRAINT "UserBlockArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlockArtist" ADD CONSTRAINT "UserBlockArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistBlockUser" ADD CONSTRAINT "ArtistBlockUser_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistBlockUser" ADD CONSTRAINT "ArtistBlockUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistMember" ADD CONSTRAINT "ArtistMember_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistMember" ADD CONSTRAINT "ArtistMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
