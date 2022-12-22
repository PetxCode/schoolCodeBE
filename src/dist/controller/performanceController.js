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
exports.recentPerformance = exports.viewPerformance = exports.createPerformance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const testModel_1 = __importDefault(require("../model/testModel"));
const performanceModel_1 = __importDefault(require("../model/performanceModel"));
const createPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { totalScore, right, failed, testCode } = req.body;
        const getStudent = yield studentModel_1.default.findById(req.params.id);
        const getTest = yield testModel_1.default.findOne({
            testCode,
        });
        let gradeScore = getTest === null || getTest === void 0 ? void 0 : getTest.gradeScore;
        if (getStudent) {
            if (getTest) {
                const performance = yield performanceModel_1.default.create({
                    right,
                    failed,
                    gradeScore: getTest === null || getTest === void 0 ? void 0 : getTest.gradeScore,
                    totalScore: gradeScore * right,
                    testName: getTest === null || getTest === void 0 ? void 0 : getTest.subjectTest,
                    teacherName: getTest === null || getTest === void 0 ? void 0 : getTest.teacherName,
                    studentName: getStudent === null || getStudent === void 0 ? void 0 : getStudent.name,
                    class: getStudent === null || getStudent === void 0 ? void 0 : getStudent.className,
                });
                getStudent.performance.push(new mongoose_1.default.Types.ObjectId(performance._id));
                getStudent === null || getStudent === void 0 ? void 0 : getStudent.save();
                return res.status(201).json({
                    message: "performance created",
                    data: performance,
                });
            }
            else {
                return res.status(404).json({ message: "Get a Test Code to continue" });
            }
        }
        else {
            return res.status(404).json({ message: "Student can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createPerformance = createPerformance;
const viewPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.default.findById(req.params.id).populate({
            path: "performance",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: `Viewing student's result...!`,
            data: student,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewPerformance = viewPerformance;
const recentPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.default.findById(req.params.id).populate({
            path: "performance",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        });
        return res.status(200).json({
            message: `Viewing student's recent result...!`,
            data: student,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.recentPerformance = recentPerformance;
