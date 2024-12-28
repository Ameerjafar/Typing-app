"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("../auth/signup"));
const signin_1 = __importDefault(require("../auth/signin"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', signup_1.default, (req, res) => {
});
authRouter.post('/signin', signin_1.default, (req, res) => { });
exports.default = authRouter;
