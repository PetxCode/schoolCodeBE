"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rateTeachingModel = new mongoose_1.default.Schema({
    time: {
        type: String,
        require: true,
    },
    ratingLecture: {
        type: Number,
        require: true,
    },
    lectureName: {
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
    subjectName: {
        type: String,
        require: true,
    },
    subjectTeacher: {
        type: String,
        require: true,
    },
    subjectCode: {
        type: String,
    },
    lecture: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "lectures",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("ratingLectures", rateTeachingModel);
