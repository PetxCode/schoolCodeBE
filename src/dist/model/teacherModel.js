"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teacherModel = new mongoose_1.default.Schema({
    subjectTaken: {
        type: Array,
    },
    resumedDate: {
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
    status: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    image: {
        type: String,
    },
    classes: {
        type: Array,
    },
    verified: {
        type: Boolean,
    },
    teacherCode: {
        type: String,
    },
    test: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "tests",
        },
    ],
    mySubjects: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "subjects",
        },
    ],
    myClass: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "classes",
        },
    ],
    lecture: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "tests",
        },
    ],
    report: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "reports",
        },
    ],
    attendance: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "attendances",
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
    school: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "schools",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("teachers", teacherModel);
