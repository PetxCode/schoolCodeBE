"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teacherModel = new mongoose_1.default.Schema({
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
    token: {
        type: String,
    },
    image: {
        type: String,
    },
    classes: {
        type: String,
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
    attendance: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "attendances",
        },
    ],
    school: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "schools",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("teachers", teacherModel);
