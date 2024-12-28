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
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const { fullName, email, password } = req.body;
    const existingEmail = yield prisma.user.findFirst({
        where: {
            email
        }
    });
    if (existingEmail) {
        res.status(403).json({ message: "This is email is already present" });
    }
    else {
        const saltRounds = parseInt(process.env.SALTROUND || '10', 10);
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        yield prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword
            }
        });
        res.status(200).json({ message: "User created successfully in the db"
        });
    }
});
exports.default = signup;
