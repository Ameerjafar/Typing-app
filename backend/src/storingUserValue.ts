import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const leaderBoard = async (wpm: string, userId: string, table: string) => {
  try {
    if (table === "sixtyLeaderBoard") {
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
      for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i].userId === userId) {
          await prisma.sixtyLeaderBoard.delete({
            where: { id: leaderboard[i].id },
          });
        }
        const wordsPerMinute = leaderboard[i].wpm;
        if (wordsPerMinute < wpm) {
          for (let j = i; j < leaderboard.length; j++) {
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
            findWpm = true;
            break;
          }
          if (findWpm) {
            break;
          }
        }
      }
    } else {
      const leaderboard = await prisma.fifteenLeaderBoard.findMany({
        orderBy: {
          ranking: "asc",
        },
      });
      let findWpm = false;
      if (leaderboard.length === 0) {
        await prisma.fifteenLeaderBoard.create({
          data: {
            userId,
            wpm,
            ranking: 1,
          },
        });
      }
      for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i].userId === userId) {
          await prisma.fifteenLeaderBoard.delete({
            where: { id: leaderboard[i].id },
          });
        }
        const wordsPerMinute = leaderboard[i].wpm;
        if (wordsPerMinute < wpm) {
          for (let j = i; j < leaderboard.length; j++) {
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
            findWpm = true;
            break;
          }
          if (findWpm) {
            break;
          }
        }
      }
    }
  } catch (error) {}
};
const storingUserValue = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { wpm, accuracy, second } = req.body;
    await prisma.typeInformation.create({
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

    res.status(200).json({ message: "Data stored successfully" });
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
