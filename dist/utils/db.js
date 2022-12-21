"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const proc = dotenv_1.default.config().parsed;
const newURL = process.env.DB;
// const LOCALDB = proc.LOCALDB;
const LOCALDB = proc.ONLINEDB;
const url = process.env.LOCALBD;
mongoose_1.default.connect(LOCALDB, () => {
    console.log("database is now connected...!");
});
exports.default = mongoose_1.default;
