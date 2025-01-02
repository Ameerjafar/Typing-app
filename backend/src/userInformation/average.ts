import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const average = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const { userId } = req.params;
  const response = await prisma.typeInformation.findMany({
    where: {
      userId,
    },
  });
  console.log(response);
  let testfivteenCount: string[] = [];
  let testThirtyCount: string[] = [];
  let testSixtyCount: string[] = [];
  for (let i = 0; i < response.length; i++) {
    if (response[i].second === 60) testSixtyCount.push(response[i].wpm);
    else if (response[i].second === 30) testThirtyCount.push(response[i].wpm);
    else testfivteenCount.push(response[i].wpm);
  }
  const avgFivteen = testfivteenCount.reduce(
    (sum, current) => sum + parseInt(current, 10),
    0
  );
  const avgsixty = testfivteenCount.reduce(
    (sum, current) => sum + parseInt(current, 10),
    0
  );
  const avgthirty = testfivteenCount.reduce(
    (sum, current) => sum + parseInt(current, 10),
    0
  );
  res.status(200).json({
    avgFivteen,
    avgsixty,
    avgthirty, 
  });
};

export default average;
