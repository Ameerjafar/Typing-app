"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userInformation_1 = __importDefault(require("../userInformation/userInformation"));
const verifyToken_1 = __importDefault(require("../verifyToken"));
const storingUserValue_1 = require("../storingUserValue");
const average_1 = __importDefault(require("../userInformation/average"));
const userRouter = (0, express_1.Router)();
userRouter.get('/:userId', verifyToken_1.default, userInformation_1.default, (req, res) => { });
userRouter.get('testInformation/:userId', verifyToken_1.default, userInformation_1.default, (req, res) => { });
userRouter.get('average/:userId', verifyToken_1.default, average_1.default, (req, res) => { });
userRouter.post('addData/:userId', verifyToken_1.default, storingUserValue_1.storingUserValue, (req, res) => { });
userRouter.put('/testStarted/:userId', verifyToken_1.default, storingUserValue_1.updatingTestStarted, (req, res) => { });
userRouter.put('/testCompleted/:userId', verifyToken_1.default, storingUserValue_1.updatingTestCompleted, (req, res) => { });
exports.default = userRouter;
