"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const expenseModel = new mongoose_1.default.Schema({
    item: {
        type: String,
    },
    date: {
        type: String,
    },
    paidMonth: {
        type: String,
    },
    paidYear: {
        type: String,
    },
    description: {
        type: String,
    },
    cost: {
        type: Number,
    },
    school: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "schools",
    },
    acedemicSession: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "acedemicSession",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("expenses", expenseModel);
