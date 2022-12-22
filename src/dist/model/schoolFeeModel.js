"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schoolFeeModel = new mongoose_1.default.Schema({
    date: {
        type: String,
        require: true,
    },
    studentName: {
        type: String,
        require: true,
    },
    studentClass: {
        type: String,
        require: true,
    },
    amountPaid: {
        type: Number,
    },
    toBalance: {
        type: Number,
    },
    academicTerm: {
        type: String,
        require: true,
    },
    student: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "students",
    },
    academicSession: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "academicSessions",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("schoolFees", schoolFeeModel);
