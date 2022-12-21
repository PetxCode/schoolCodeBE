"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const proc = (0, dotenv_1.config)().parsed;
cloudinary.config({
    cloud_name: proc.CLOUD_NAME,
    api_key: proc.CLOUD_KEY,
    api_secret: proc.CLOUD_SECRET,
});
exports.default = cloudinary;
