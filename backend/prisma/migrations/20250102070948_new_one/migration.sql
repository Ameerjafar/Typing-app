-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "testStarted" INTEGER NOT NULL,
    "testCompleted" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeInformation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wpm" TEXT NOT NULL,
    "accuracy" TEXT NOT NULL,
    "second" INTEGER NOT NULL,

    CONSTRAINT "TypeInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SixtyLeaderBoard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wpm" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "SixtyLeaderBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FifteenLeaderBoard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wpm" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "FifteenLeaderBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TypeInformation" ADD CONSTRAINT "TypeInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SixtyLeaderBoard" ADD CONSTRAINT "SixtyLeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FifteenLeaderBoard" ADD CONSTRAINT "FifteenLeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
