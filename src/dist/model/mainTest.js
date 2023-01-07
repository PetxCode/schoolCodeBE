"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mainTestModel = new mongoose_1.default.Schema({
    question: {
        type: String,
        require: true,
    },
    answer: {
        type: String,
        require: true,
    },
    myAnswer: {
        type: String,
        require: true,
    },
    a: {
        type: String,
        require: true,
    },
    b: {
        type: String,
        require: true,
    },
    c: {
        type: String,
        require: true,
    },
    d: {
        type: String,
        require: true,
    },
    test: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "tests",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("mainTests", mainTestModel);
