"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reportModel = new mongoose_1.default.Schema({
    who: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    senderName: {
        type: String,
        require: true,
    },
    teacher: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "tests",
    },
    student: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "students",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("reports", reportModel);
