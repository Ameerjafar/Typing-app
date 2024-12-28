/*
  Warnings:

  - You are about to drop the `LeaderBoard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeaderBoard" DROP CONSTRAINT "LeaderBoard_userId_fkey";

-- DropTable
DROP TABLE "LeaderBoard";

-- CreateTable
CREATE TABLE "SixtyLeaderBoard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wpm" TEXT NOT NULL,
    "sixtyRanking" INTEGER NOT NULL,

    CONSTRAINT "SixtyLeaderBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FifteenLeaderBoard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wpm" TEXT NOT NULL,
    "FifteenLeaderBoard" INTEGER NOT NULL,

    CONSTRAINT "FifteenLeaderBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SixtyLeaderBoard" ADD CONSTRAINT "SixtyLeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FifteenLeaderBoard" ADD CONSTRAINT "FifteenLeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
