"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpense = exports.createExpense = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const academicSessionModel_1 = __importDefault(require("../model/academicSessionModel"));
const moment_1 = __importDefault(require("moment"));
const expenseModel_1 = __importDefault(require("../model/expenseModel"));
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, cost, item, description } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        const dateTime = Date.now();
        if (getSchool) {
            const expense = yield expenseModel_1.default.create({
                date: (0, moment_1.default)(dateTime).format("LLLL"),
                cost,
                item,
                description,
            });
            getSession.expense.push(new mongoose_1.default.Types.ObjectId(expense._id));
            getSession === null || getSession === void 0 ? void 0 : getSession.save();
            return res.status(201).json({
                message: `expense has been recorded for ${(0, moment_1.default)(dateTime).format("LLLL")}`,
                data: expense,
            });
        }
        else {
            return res.status(404).json({ message: "school can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createExpense = createExpense;
const getExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        if (getSchool) {
            const expense = yield academicSessionModel_1.default
                .findById(getSession === null || getSession === void 0 ? void 0 : getSession._id)
                .populate({
                path: "expense",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });
            return res.status(201).json({
                message: `view expense `,
                data: expense,
            });
        }
        else {
            return res.status(404).json({ message: "school can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.getExpense = getExpense;
