"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentModel = new mongoose_1.default.Schema({
    className: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    schoolName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    teacherName: {
        type: String,
    },
    attendance: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "attendances",
        },
    ],
    classes: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "classes",
    },
    school: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "schools",
    },
    performance: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "performances",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("students", studentModel);
