"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventModel = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    fixedDate: {
        type: String,
    },
    dateTime: {
        type: String,
    },
    date: {
        type: String,
    },
    month: {
        type: String,
    },
    time: {
        type: String,
    },
    year: {
        type: String,
    },
    done: {
        type: Boolean,
    },
    school: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "schools",
    },
    academicSession: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "academicSessions",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("events", eventModel);
