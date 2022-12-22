"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schoolFeeModel = new mongoose_1.default.Schema({
    receiptToken: {
        type: String,
    },
    sessionPaymentCode: {
        type: String,
    },
    dateTime: {
        type: String,
    },
    date: {
        type: String,
    },
    studentName: {
        type: String,
    },
    studentClass: {
        type: String,
    },
    amountPaid: {
        type: Number,
    },
    toBalance: {
        type: Number,
    },
    academicTerm: {
        type: String,
    },
    student: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "students",
    },
    academicSession: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("schoolFees", schoolFeeModel);
