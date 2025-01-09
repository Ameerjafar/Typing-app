import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { loadEnvFile } from "process";

const prisma = new PrismaClient();
const leaderBoard = async (wpm: string, userId: string, table: string) => {
  try {
    if (table === "sixtyLeaderBoard") {
      const userSixtyRanking = await prisma.sixtyLeaderBoard.findMany({
        where: {
          userId
        }
      })
      if(userSixtyRanking) {
        if(userSixtyRanking[0].wpm < wpm) {
        return;
        }
        else {
          await prisma.sixtyLeaderBoard.deleteMany({
            where: {
              userId
            }
          })
        }
      }


      const leaderboard = await prisma.sixtyLeaderBoard.findMany({
        orderBy: {
          ranking: "asc",
        },
      });
      let findWpm = false;
      if (leaderboard.length === 0) {
        await prisma.sixtyLeaderBoard.create({
          data: {
            userId,
            wpm,
            ranking: 1,
          },
        });
      }
      let pointer = 0;
      for (let i = pointer; i < leaderboard.length; i++) {
        const wordsPerMinute = leaderboard[i].wpm;
        if (wordsPerMinute < wpm) {
          await prisma.sixtyLeaderBoard.create({
            data: {
              wpm,
              ranking: leaderboard[i].ranking,
              userId
            }
          })
          break;
        }
        pointer++;
      }
      if(pointer === leaderboard.length) {
        await prisma.sixtyLeaderBoard.create({
          data: {
            userId,
            ranking: await prisma.sixtyLeaderBoard.count() + 1,
            wpm
          }
        })
      }
      for (let j = pointer; j < leaderboard.length; j++) {
        await prisma.sixtyLeaderBoard.update({
          where: {
            id: leaderboard[j].id,
          },
          data: {
            ranking: {
              increment: 1,
            },
          },
        });
      }
    } else {
      const userSixtyRanking = await prisma.fifteenLeaderBoard.findMany({
        where: {
          userId
        }
      })
      if(userSixtyRanking) {
        if(userSixtyRanking[0].wpm < wpm) {
        return;
        }
        else {
          await prisma.fifteenLeaderBoard.deleteMany({
            where: {
              userId
            }
          })
        }
      }
      const leaderboard = await prisma.fifteenLeaderBoard.findMany({
        orderBy: {
          ranking: "asc",
        },
      });
      if (leaderboard.length === 0) {
        await prisma.fifteenLeaderBoard.create({
          data: {
            userId,
            wpm,
            ranking: 1,
          },
        });
      }
      let pointer = 0;
      for (let i = pointer; i < leaderboard.length; i++) {
        const wordsPerMinute = leaderboard[i].wpm;
        if (wordsPerMinute < wpm) {
          await prisma.fifteenLeaderBoard.create({
            data: {
              wpm,
              ranking: leaderboard[i].ranking,
              userId
            }
          })
          break;
        }
        pointer++;
      }
      if(pointer === leaderboard.length) {
        await prisma.fifteenLeaderBoard.create({
          data: {
            userId,
            ranking: await prisma.fifteenLeaderBoard.count() + 1,
            wpm
          }
        })
      }
      for (let j = pointer; j < leaderboard.length; j++) {
        await prisma.fifteenLeaderBoard.update({
          where: {
            id: leaderboard[j].id,
          },
          data: {
            ranking: {
              increment: 1,
            },
          },
        });
      }
    }
  } catch (error) {}
};
const storingUserValue = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { wpm, accuracy, second } = req.body;
    const info = await prisma.typeInformation.create({
      data: {
        userId,
        wpm,
        accuracy,
        second,
      },
    });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      if (second === 60) {
        leaderBoard(wpm, user!.id, "sixtyLeaderBoard");
      } else {
        leaderBoard(wpm, user!.id, "fifteenLeaderBoard");
      }
    }

    res.status(200).json({ message: info });
  } catch (error) {
    res.status(403).json(error);
  }
};
const updatingTestStarted = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const { userId } = req.params;
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      testStarted: {
        increment: 1,
      },
    },
  });
};
export const updatingTestCompleted = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const { userId } = req.params;
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      testStarted: {
        increment: 1,
      },
      testCompleted: {
        increment: 1
      }
    },
  });
};

const showUserRanking = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const sixty = await prisma.sixtyLeaderBoard.findFirst({
            where: {
                userId: userId
            }
        })
        const fivteen = await prisma.fifteenLeaderBoard.findFirst({
            where: {
                userId: userId
            }
        })
        res.status(200).json({sixty, fivteen});
    }catch(error) {
        res.status(400).json(error);
    }

    
}

export { storingUserValue, updatingTestStarted, showUserRanking };
