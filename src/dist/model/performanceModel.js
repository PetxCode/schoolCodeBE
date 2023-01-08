"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const performanceModel = new mongoose_1.default.Schema({
    totalScore: {
        type: Number,
        require: true,
    },
    right: {
        type: Number,
        require: true,
    },
    failed: {
        type: Number,
        require: true,
    },
    maxLength: {
        type: Number,
        require: true,
    },
    gradeScore: {
        type: Number,
        require: true,
    },
    precentage: {
        type: String,
        require: true,
    },
    grade: {
        type: String,
        require: true,
    },
    student: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "students",
    },
    teacherName: {
        type: String,
    },
    studentName: {
        type: String,
    },
    testTitle: {
        type: String,
    },
    testName: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("performances", performanceModel);
