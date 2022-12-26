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
exports.viewPresentAcademicSession = exports.viewAcademicSession = exports.findAcademicSession = exports.AcademicSessionForTeacher = exports.createAcademicSession = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const academicSessionModel_1 = __importDefault(require("../model/academicSessionModel"));
const createAcademicSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const { academicSession, academicTerm } = req.body;
        if (getSchool) {
            const dater = Date.now();
            const code = crypto_1.default.randomBytes(3).toString("hex");
            const academicSessionData = yield academicSessionModel_1.default.create({
                schoolName: getSchool.schoolName,
                sessionCode: code,
                academicSession,
                academicTerm,
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                date: `${(0, moment_1.default)(dater).format("dddd")}`,
            });
            getSchool.academicSession.push(new mongoose_1.default.Types.ObjectId(academicSessionData._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            return res.status(201).json({
                message: "Academic session is now created",
                data: academicSessionData,
            });
        }
        else {
            return res.status(404).json({ message: "student can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createAcademicSession = createAcademicSession;
const AcademicSessionForTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const view = yield teacherModel_1.default.findById(req.params.id);
        const session = yield schoolModel_1.default.findOne({ schoolName: view === null || view === void 0 ? void 0 : view.schoolName });
        if ((view === null || view === void 0 ? void 0 : view.schoolName) === session.schoolName) {
            const school = yield schoolModel_1.default.findById(session === null || session === void 0 ? void 0 : session._id).populate({
                path: "academicSession",
                options: { sort: { createdAt: -1 }, limit: 1 },
            });
            return res.status(200).json({
                message: `Viewing academic session detail...!`,
                data: school.academicSession[0],
            });
        }
        else {
            return res.status(404).json({ message: "Check your session code again" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.AcademicSessionForTeacher = AcademicSessionForTeacher;
const findAcademicSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionCode } = req.body;
        const view = yield schoolModel_1.default.findById(req.params.id);
        const session = yield academicSessionModel_1.default.findOne({ sessionCode });
        console.log(session);
        console.log(view);
        if ((view === null || view === void 0 ? void 0 : view.schoolName) === session.schoolName) {
            const school = yield schoolModel_1.default.findById(req.params.id).populate({
                path: "academicSession",
                options: { sort: { createdAt: -1 }, limit: 1 },
            });
            return res.status(200).json({
                message: `Viewing academic session detail...!`,
                data: school.academicSession[0],
            });
        }
        else {
            return res.status(404).json({ message: "Check your session code again" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.findAcademicSession = findAcademicSession;
const viewAcademicSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const view = yield schoolModel_1.default.findById(req.params.id);
        console.log(view);
        const school = yield schoolModel_1.default.findById(req.params.id).populate({
            path: "academicSession",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing academic session detail...!`,
            data: school,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewAcademicSession = viewAcademicSession;
const viewPresentAcademicSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield schoolModel_1.default.findById(req.params.id).populate({
            path: "academicSession",
            options: { sort: { createdAt: -1 }, limit: 1 },
        });
        return res.status(200).json({
            message: `Viewing present academic session detail...!`,
            data: school.academicSession[0],
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewPresentAcademicSession = viewPresentAcademicSession;
