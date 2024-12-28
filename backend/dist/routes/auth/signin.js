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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const { email, password } = req.body;
    const existingUser = yield prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!existingUser) {
        res.status(403).json({ message: "This Email is not present in the db" });
    }
    const hashedPassword = yield bcrypt_1.default.compare(password, existingUser.password);
    if (hashedPassword) {
        try {
            const token = jsonwebtoken_1.default.sign({ email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email, id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ token: token });
        }
        catch (error) {
            return res.status(200).json(error);
        }
    }
    else {
        res.status(403).json({ meessage: "Your password must be wrong" });
    }
});
exports.default = signin;
