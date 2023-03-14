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
exports.viewStudentEvent = exports.viewTeacherEvent = exports.viewSchoolEvent = exports.updateEvent = exports.createEvent = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const moment_1 = __importDefault(require("moment"));
const eventModel_1 = __importDefault(require("../model/eventModel"));
const academicSessionModel_1 = __importDefault(require("../model/academicSessionModel"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, month, time, year, fixedDate, code } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        if (getSchool.schoolName === getSession.schoolName) {
            const code = crypto_1.default.randomBytes(2).toString("hex");
            const dater = Date.now();
            const event = yield eventModel_1.default.create({
                title,
                desc,
                month: `${(0, moment_1.default)(dater).format("LLL")}`.split(" ")[0],
                time: "10:00AM",
                year: (0, moment_1.default)().format("LL").split(",")[1],
                fixedDate: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                schoolName: getSchool.schoolName,
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                date: `${(0, moment_1.default)(dater).format("dddd")} ${(0, moment_1.default)(dater).format("MMM Do YY")}`,
            });
            getSession.event.push(new mongoose_1.default.Types.ObjectId(event._id));
            getSession === null || getSession === void 0 ? void 0 : getSession.save();
            return res.status(201).json({
                message: "event created",
                data: event,
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
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        if (getSchool) {
            const code = crypto_1.default.randomBytes(2).toString("hex");
            const dater = Date.now();
            const event = yield eventModel_1.default.findByIdAndUpdate(req.params.eventID, {
                done: true,
            }, { new: true });
            return res.status(201).json({
                message: "event updated",
                data: event,
            });
        }
        else {
            return res.status(404).json({ message: "Event can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.updateEvent = updateEvent;
const viewSchoolEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield academicSessionModel_1.default.findById(req.params.id).populate({
            path: "event",
            options: { sort: { createdAt: -1 } },
        });
        console.log(event.event);
        return res.status(200).json({
            message: `Viewing events...!`,
            data: event === null || event === void 0 ? void 0 : event.event,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewSchoolEvent = viewSchoolEvent;
const viewTeacherEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "event",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing events...!`,
            data: event,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherEvent = viewTeacherEvent;
const viewStudentEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield studentModel_1.default.findById(req.params.id).populate({
            path: "event",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing events...!`,
            data: event,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentEvent = viewStudentEvent;
