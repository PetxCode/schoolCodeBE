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
exports.viewSchoolPayment = exports.viewTeacherPayment = exports.updateTeacherPay = exports.createPayTeacher = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const payRollModel_1 = __importDefault(require("../model/payRollModel"));
const academicSessionModel_1 = __importDefault(require("../model/academicSessionModel"));
const moment_1 = __importDefault(require("moment"));
const createPayTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getTeacher = yield teacherModel_1.default.findById(req.params.teacherID);
        const getAcademic = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        const dateTime = Date.now();
        const monthDate = (0, moment_1.default)(dateTime).format("MMMM Do YYYY, h:mm:ss");
        if (getSchool) {
            const pay = yield payRollModel_1.default.create({
                paidMonth: monthDate.split(" ")[0],
                paidYear: monthDate.split(",")[0].split(" ")[2],
                payData: (0, moment_1.default)(dateTime).format("LLLL"),
                recieved: false,
                name: getTeacher.name,
                salary: getTeacher.salary,
            });
            getSchool.payRolls.push(new mongoose_1.default.Types.ObjectId(pay._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            getAcademic.payRolls.push(new mongoose_1.default.Types.ObjectId(pay._id));
            getAcademic === null || getAcademic === void 0 ? void 0 : getAcademic.save();
            getTeacher.payRolls.push(new mongoose_1.default.Types.ObjectId(pay._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            return res.status(201).json({
                message: `Payment has been made for ${(0, moment_1.default)(dateTime).format("LLLL")}`,
                data: pay,
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
exports.createPayTeacher = createPayTeacher;
const updateTeacherPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const getTeacher = yield teacherModel_1.default.findById(req.params.id);
        const getPay = yield payRollModel_1.default.findById(req.params.paymentID);
        console.log(getTeacher);
        console.log(getPay);
        if (getTeacher) {
            const pay = yield payRollModel_1.default.findByIdAndUpdate(req.params.paymentID, {
                recieved: true,
            }, { new: true });
            return res.status(201).json({
                message: `Payment has been confirm`,
                data: pay,
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
exports.updateTeacherPay = updateTeacherPay;
const viewTeacherPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTeacher = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "payRolls",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(201).json({
            message: `Payment has been confirm`,
            data: getTeacher,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherPayment = viewTeacherPayment;
const viewSchoolPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSchool = yield schoolModel_1.default.findById(req.params.id).populate({
            path: "payRolls",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(201).json({
            message: `Payment has been confirm`,
            data: getSchool,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewSchoolPayment = viewSchoolPayment;
