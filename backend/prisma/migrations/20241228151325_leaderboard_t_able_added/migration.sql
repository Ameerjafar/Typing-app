/*
  Warnings:

  - Added the required column `fiveteenRanking` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sixtyRanking` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fiveteenRanking" INTEGER NOT NULL,
ADD COLUMN     "sixtyRanking" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wpm" TEXT NOT NULL,
    "sixtyRanking" INTEGER NOT NULL,
    "fivteenRanking" INTEGER NOT NULL,

    CONSTRAINT "LeaderBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
