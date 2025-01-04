"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUserRanking = exports.updatingTestStarted = exports.storingUserValue = exports.updatingTestCompleted = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const leaderBoard = (wpm, userId, table) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (table === "sixtyLeaderBoard") {
            yield prisma.sixtyLeaderBoard.deleteMany({ where: { userId } });
            const leaderboard = yield prisma.sixtyLeaderBoard.findMany({
                orderBy: {
                    ranking: "asc",
                },
            });
            let findWpm = false;
            if (leaderboard.length === 0) {
                yield prisma.sixtyLeaderBoard.create({
                    data: {
                        userId,
                        wpm,
                        ranking: 1,
                    },
                });
            }
            for (let i = 0; i < leaderboard.length; i++) {
                const wordsPerMinute = leaderboard[i].wpm;
                if (wordsPerMinute < wpm) {
                    for (let j = i; j < leaderboard.length; j++) {
                        yield prisma.sixtyLeaderBoard.update({
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
        else {
            yield prisma.sixtyLeaderBoard.deleteMany({ where: { userId } });
            const leaderboard = yield prisma.fifteenLeaderBoard.findMany({
                orderBy: {
                    ranking: "asc",
                },
            });
            let findWpm = false;
            if (leaderboard.length === 0) {
                yield prisma.fifteenLeaderBoard.create({
                    data: {
                        userId,
                        wpm,
                        ranking: 1,
                    },
                });
            }
            for (let i = 0; i < leaderboard.length; i++) {
                const wordsPerMinute = leaderboard[i].wpm;
                if (wordsPerMinute < wpm) {
                    for (let j = i; j < leaderboard.length; j++) {
                        yield prisma.fifteenLeaderBoard.update({
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
    }
    catch (error) { }
});
const storingUserValue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { wpm, accuracy, second } = req.body;
        const info = yield prisma.typeInformation.create({
            data: {
                userId,
                wpm,
                accuracy,
                second,
            },
        });
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            if (second === 60) {
                leaderBoard(wpm, user.id, "sixtyLeaderBoard");
            }
            else {
                leaderBoard(wpm, user.id, "fifteenLeaderBoard");
            }
        }
        res.status(200).json({ message: info });
    }
    catch (error) {
        res.status(403).json(error);
    }
});
exports.storingUserValue = storingUserValue;
const updatingTestStarted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const { userId } = req.params;
    yield prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            testStarted: {
                increment: 1,
            },
        },
    });
});
exports.updatingTestStarted = updatingTestStarted;
const updatingTestCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const { userId } = req.params;
    yield prisma.user.update({
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
});
exports.updatingTestCompleted = updatingTestCompleted;
const showUserRanking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const sixty = yield prisma.sixtyLeaderBoard.findFirst({
            where: {
                userId: userId
            }
        });
        const fivteen = yield prisma.fifteenLeaderBoard.findFirst({
            where: {
                userId: userId
            }
        });
        res.status(200).json({ sixty, fivteen });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.showUserRanking = showUserRanking;
