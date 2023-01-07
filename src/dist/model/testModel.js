"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testModel = new mongoose_1.default.Schema({
    subjectTest: {
        type: String,
        require: true,
    },
    testName: {
        type: Number,
        require: true,
    },
    gradeScore: {
        type: Number,
        require: true,
    },
    testCode: {
        type: String,
        require: true,
    },
    time: {
        type: String,
        require: true,
    },
    instruction: {
        type: String,
        require: true,
    },
    testDetails: {
        type: Array,
    },
    classes: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "classes",
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
    mainTest: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "mainTests",
        },
    ],
    students: [{ type: String }],
    teacherName: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("tests", testModel);
