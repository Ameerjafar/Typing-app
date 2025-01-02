"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storingUserValue_1 = require("../storingUserValue");
const leaderBoardRouter = (0, express_1.Router)();
leaderBoardRouter.get('/:userId', storingUserValue_1.showUserRanking, (req, res) => { });
exports.default = leaderBoardRouter;
