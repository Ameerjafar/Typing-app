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
const client_1 = require("@prisma/client");
const average = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const { userId } = req.params;
    const response = yield prisma.typeInformation.findMany({
        where: {
            userId,
        },
    });
    console.log(response);
    let testfivteenCount = [];
    let testThirtyCount = [];
    let testSixtyCount = [];
    for (let i = 0; i < response.length; i++) {
        if (response[i].second === 60)
            testSixtyCount.push(response[i].wpm);
        else if (response[i].second === 30)
            testThirtyCount.push(response[i].wpm);
        else
            testfivteenCount.push(response[i].wpm);
    }
    const avgFivteen = (testfivteenCount.reduce((sum, current) => sum + parseInt(current, 10), 0) / testfivteenCount.length).toFixed(0);
    const avgSixty = (testSixtyCount.reduce((sum, current) => sum + parseInt(current, 10), 0) / testSixtyCount.length).toFixed(0);
    const avgthirty = (testThirtyCount.reduce((sum, current) => sum + parseInt(current, 10), 0) / testThirtyCount.length).toFixed(0);
    res.status(200).json({
        avgFivteen,
        avgthirty,
        avgSixty,
    });
});
exports.default = average;
