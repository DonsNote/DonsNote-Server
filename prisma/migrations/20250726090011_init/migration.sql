/*
  Warnings:

  - Added the required column `artistId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userImgURL` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "artistId" INTEGER NOT NULL,
ADD COLUMN     "block" INTEGER[],
ADD COLUMN     "follow" INTEGER[],
ADD COLUMN     "info" TEXT NOT NULL,
ADD COLUMN     "userImgURL" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Aurh" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "reToken" TEXT NOT NULL,

    CONSTRAINT "Aurh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "artistName" TEXT NOT NULL,
    "artistInfo" TEXT NOT NULL,
    "artistImgURL" TEXT NOT NULL,
    "genres" INTEGER NOT NULL,
    "member" INTEGER[],
    "follower" INTEGER[],
    "block" INTEGER[],
    "busking" INTEGER[],
    "youtubeURL" TEXT NOT NULL,
    "instarURL" TEXT NOT NULL,
    "soundURL" TEXT NOT NULL,
    "otherURL" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Busking" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "buskingName" TEXT NOT NULL,
    "buskingInfo" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Busking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    "reportType" INTEGER NOT NULL,
    "report" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aurh_uid_key" ON "Aurh"("uid");
