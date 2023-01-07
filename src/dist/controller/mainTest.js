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
exports.viewTeacherAllTest = exports.viewTeacherTest = exports.viewSingleTest = exports.viewTopTest = exports.viewClassTest = exports.viewTestOption = exports.createTestOption = void 0;
const classModel_1 = __importDefault(require("../model/classModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const testModel_1 = __importDefault(require("../model/testModel"));
const subjectModel_1 = __importDefault(require("../model/subjectModel"));
const mainTest_1 = __importDefault(require("../model/mainTest"));
const createTestOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, a, b, c, d, answer, myAnswer } = req.body;
        const getTest = yield testModel_1.default.findById(req.params.id);
        if (getTest) {
            const test = yield mainTest_1.default.create({
                question,
                a,
                b,
                c,
                d,
                answer,
                myAnswer,
            });
            getTest.mainTest.push(new mongoose_1.default.Types.ObjectId(test._id));
            getTest === null || getTest === void 0 ? void 0 : getTest.save();
            return res.status(201).json({
                message: "test option created",
                data: test,
            });
        }
        else {
            return res.status(404).json({ message: "School can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createTestOption = createTestOption;
const viewTestOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield testModel_1.default.findById(req.params.id).populate({
            path: "mainTest",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTestOption = viewTestOption;
const viewClassTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield classModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "viewing class test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewClassTest = viewClassTest;
const viewTopTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield subjectModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTopTest = viewTopTest;
const viewSingleTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield testModel_1.default.findById(req.params.id);
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewSingleTest = viewSingleTest;
const viewTeacherTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherTest = viewTeacherTest;
const viewTeacherAllTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherAllTest = viewTeacherAllTest;
