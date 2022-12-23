"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationModel = new mongoose_1.default.Schema({
    detail: {
        type: String,
    },
    title: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    academicSession: {
        type: String,
    },
    academicTerm: {
        type: String,
    },
    date: {
        type: String,
    },
    dateTime: {
        type: String,
    },
    school: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "schools",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("notifications", notificationModel);
