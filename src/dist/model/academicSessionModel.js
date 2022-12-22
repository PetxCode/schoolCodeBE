"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const academicSessionModel = new mongoose_1.default.Schema({
    sessionPaymentCode: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    academicSession: {
        type: String,
    },
    academicTerm: {
        type: String,
    },
    date: {
        type: String,
    },
    dateTime: {
        type: String,
    },
    schoolFees: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "schoolFees",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("academicSessions", academicSessionModel);
