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
exports.viewClasses = exports.viewClassDetailInfo = exports.viewClassDetailFromSchool = exports.assigClassTeacher = exports.createPerformance = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const classModel_1 = __importDefault(require("../model/classModel"));
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
const assigClassTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const school = yield schoolModel_1.default.findById(req.params.id);
        const classes = yield classModel_1.default.findById(req.params.classID);
        const teacher = yield teacherModel_1.default.findOne({ name });
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.schoolName) === (school === null || school === void 0 ? void 0 : school.schoolName)) {
            yield classModel_1.default.findByIdAndUpdate(req.params.classID, {
                classTeacher: teacher === null || teacher === void 0 ? void 0 : teacher.name,
            }, { new: true });
            yield teacherModel_1.default.findByIdAndUpdate(teacher._id, {
                classes: classes.className,
            }, { new: true });
            return res.status(200).json({
                message: `Teacher has been assigned to this Class...!`,
            });
        }
        else {
            return res
                .status(404)
                .json({ message: `Please check if the Name is rightly spelt` });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.assigClassTeacher = assigClassTeacher;
const viewClassDetailFromSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield schoolModel_1.default.findById(req.params.id);
        const code = crypto_1.default.randomBytes(2).toString("hex");
        if (school) {
            const myClass = yield schoolModel_1.default.findById(school._id).populate({
                path: "classes",
                options: {
                    sort: { createdAt: -1 },
                },
            });
            return res.status(200).json({
                message: `Viewing class detail...!`,
                data: myClass,
            });
        }
        else {
            return res.status(404).json({ message: `Please fixed the school Name` });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewClassDetailFromSchool = viewClassDetailFromSchool;
const viewClassDetailInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myClass = yield classModel_1.default.findById(req.params.id);
        const code = crypto_1.default.randomBytes(2).toString("hex");
        return res.status(200).json({
            message: `Viewing class detail...!`,
            data: myClass,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewClassDetailInfo = viewClassDetailInfo;
const viewClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myClass = yield classModel_1.default.find();
        return res.status(200).json({
            message: `Viewing class detail...!`,
            data: myClass,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewClasses = viewClasses;
