"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subjectModel = new mongoose_1.default.Schema({
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
    students: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "students",
        },
    ],
    test: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "tests",
        },
    ],
    lecture: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "lectures",
        },
    ],
    classes: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "classes",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("subjects", subjectModel);
