"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const landingRoute = (0, express_1.Router)();
landingRoute.get('/', (req, res) => {
    fs_1.default.readFile('./sampleData.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(404).json({ message: "we cannot get the paragraph" });
        }
        console.log(data);
        const paragraph = JSON.parse(data).paragraphs;
        const randomParagraph = paragraph[Math.floor(Math.random() * paragraph.length)];
        res.json({ paragraph: randomParagraph });
    });
});
exports.default = landingRoute;
