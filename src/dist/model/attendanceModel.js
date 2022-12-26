"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceModel = new mongoose_1.default.Schema({
    date: {
        type: String,
        require: true,
    },
    studentName: {
        type: String,
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
    present: {
        type: Boolean,
        require: true,
    },
    absent: {
        type: Boolean,
        require: true,
    },
    dateTime: {
        type: String,
        require: true,
    },
    students: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "students",
    },
    classes: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "classes",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("attendances", attendanceModel);
