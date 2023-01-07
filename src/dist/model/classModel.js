"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const classModel = new mongoose_1.default.Schema({
    termFee: {
        type: Number,
        require: true,
    },
    className: {
        type: String,
        require: true,
    },
    classTeacher: {
        type: String,
        require: true,
    },
    classToken: {
        type: String,
    },
    teacherCode: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    schoolFee: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "schoolFees",
        },
    ],
    students: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "students",
        },
    ],
    subject: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "subjects",
        },
    ],
    myClass: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "teachers",
    },
    attendance: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "attendancess",
        },
    ],
    test: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "tests",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("classes", classModel);
