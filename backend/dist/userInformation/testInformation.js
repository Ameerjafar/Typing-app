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
const userInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const { userId } = req.params;
        const userInformation = yield prisma.typeInformation.findMany({
            where: {
                id: userId
            }
        });
        console.log(userInformation);
        if (!userInformation) {
            res.status(404).json({ message: "No records available at this moment" });
        }
        else {
            res.status(200).json({ userInformation });
        }
    }
    catch (error) {
        res.status(403).json({ error });
    }
});
exports.default = userInformation;
