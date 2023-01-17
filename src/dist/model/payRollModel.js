"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const payRollModel = new mongoose_1.default.Schema({
    payData: {
        type: String,
    },
    name: {
        type: String,
    },
    salary: {
        type: Number,
    },
    recieved: {
        type: Boolean,
        require: true,
    },
    teacher: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "teachers",
    },
    school: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "schools",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("payRolls", payRollModel);
