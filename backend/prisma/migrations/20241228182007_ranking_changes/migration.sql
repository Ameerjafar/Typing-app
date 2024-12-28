/*
  Warnings:

  - You are about to drop the column `FifteenLeaderBoard` on the `FifteenLeaderBoard` table. All the data in the column will be lost.
  - You are about to drop the column `sixtyRanking` on the `SixtyLeaderBoard` table. All the data in the column will be lost.
  - Added the required column `ranking` to the `FifteenLeaderBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ranking` to the `SixtyLeaderBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FifteenLeaderBoard" DROP COLUMN "FifteenLeaderBoard",
ADD COLUMN     "ranking" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SixtyLeaderBoard" DROP COLUMN "sixtyRanking",
ADD COLUMN     "ranking" INTEGER NOT NULL;
