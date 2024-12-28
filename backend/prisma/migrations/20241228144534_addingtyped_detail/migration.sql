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

-- AddForeignKey
ALTER TABLE "TypeInformation" ADD CONSTRAINT "TypeInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
