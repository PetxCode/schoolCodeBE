"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schoolModel = new mongoose_1.default.Schema({
    schoolName: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    status: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    logo: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    schoolCode: {
        type: String,
    },
    teachers: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "teachers",
        },
    ],
    notification: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "notifications",
        },
    ],
    event: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "events",
        },
    ],
    academicSession: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "academicSessions",
        },
    ],
    students: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "students",
        },
    ],
    classes: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "classes",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("schools", schoolModel);
