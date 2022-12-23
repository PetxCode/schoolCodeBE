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
exports.viewStudentNotification = exports.viewTeacherNotification = exports.viewSchoolNotification = exports.createNotification = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const moment_1 = __importDefault(require("moment"));
const notificationModel_1 = __importDefault(require("../model/notificationModel"));
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, detail } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getTeacher = yield teacherModel_1.default.findOne({
            schoolName: getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName,
        });
        const getStudent = yield studentModel_1.default.findOne({
            schoolName: getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName,
        });
        if (getSchool) {
            const code = crypto_1.default.randomBytes(2).toString("hex");
            const dater = Date.now();
            const notice = yield notificationModel_1.default.create({
                title,
                detail,
                schoolName: getSchool.schoolName,
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                date: `${(0, moment_1.default)(dater).format("dddd")}`,
            });
            getSchool.notification.push(new mongoose_1.default.Types.ObjectId(notice._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            getTeacher.notification.push(new mongoose_1.default.Types.ObjectId(notice._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            getStudent.notification.push(new mongoose_1.default.Types.ObjectId(notice._id));
            getStudent === null || getStudent === void 0 ? void 0 : getStudent.save();
            return res.status(201).json({
                message: "Announcement created",
                data: notice,
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
exports.createNotification = createNotification;
const viewSchoolNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield schoolModel_1.default.findById(req.params.id).populate({
            path: "notification",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing notifications...!`,
            data: notification,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewSchoolNotification = viewSchoolNotification;
const viewTeacherNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "notification",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing notifications...!`,
            data: notification,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherNotification = viewTeacherNotification;
const viewStudentNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield studentModel_1.default.findById(req.params.id).populate({
            path: "notification",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing notifications...!`,
            data: notification,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentNotification = viewStudentNotification;
