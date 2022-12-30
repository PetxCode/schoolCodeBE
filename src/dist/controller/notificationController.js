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
exports.viewStudentNotification = exports.viewTeacherNotification = exports.viewSchoolNotificationOne = exports.viewSchoolNotification = exports.createNotification = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const moment_1 = __importDefault(require("moment"));
const notificationModel_1 = __importDefault(require("../model/notificationModel"));
const academicSessionModel_1 = __importDefault(require("../model/academicSessionModel"));
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, detail, code } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        if (getSchool) {
            const dater = Date.now();
            console.log(getSession.sessionCode);
            if (code === (getSession === null || getSession === void 0 ? void 0 : getSession.sessionCode)) {
                const notice = yield notificationModel_1.default.create({
                    title,
                    detail,
                    schoolName: getSchool.schoolName,
                    dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                    date: `${(0, moment_1.default)(dater).format("dddd")}`,
                });
                getSession.notification.push(new mongoose_1.default.Types.ObjectId(notice._id));
                getSession === null || getSession === void 0 ? void 0 : getSession.save();
                return res.status(201).json({
                    message: "Announcement created",
                    data: notice,
                });
            }
            else {
                return res.status(404).json({
                    message: "notify which session are you with the session code",
                });
            }
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
        const { code } = req.body;
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        const school = yield schoolModel_1.default.findById(req.params.id);
        if (school) {
            if (getSession) {
                const notify = yield academicSessionModel_1.default
                    .findById({
                    _id: getSession._id,
                })
                    .populate({
                    path: "notification",
                    options: {
                        sort: { createdAt: -1 },
                    },
                });
                return res.status(200).json({
                    message: "Here are data for this session...!",
                    data: notify,
                });
            }
            else {
                return res.status(404).json({
                    message: "Please enter a session you'd like to work with...!",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "no school has been registered",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewSchoolNotification = viewSchoolNotification;
const viewSchoolNotificationOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        const school = yield schoolModel_1.default.findById(req.params.id);
        if (school) {
            if (getSession) {
                const notify = yield academicSessionModel_1.default
                    .findById({
                    _id: getSession._id,
                })
                    .populate({
                    path: "notification",
                    options: {
                        sort: { createdAt: -1 },
                        limit: 1,
                    },
                });
                return res.status(200).json({
                    message: "Here are data for this session...!",
                    data: notify,
                });
            }
            else {
                return res.status(404).json({
                    message: "Please enter a session you'd like to work with...!",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "no school has been registered",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewSchoolNotificationOne = viewSchoolNotificationOne;
const viewTeacherNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        const teacher = yield teacherModel_1.default.findById(req.params.id);
        const school = yield schoolModel_1.default.findOne({
            schoolName: teacher.schoolName,
        });
        if (school) {
            if (getSession) {
                const notify = yield academicSessionModel_1.default
                    .findById({
                    _id: getSession._id,
                })
                    .populate({
                    path: "notification",
                    options: {
                        createdAt: -1,
                    },
                });
                return res.status(200).json({
                    message: "Here are data for this session...!",
                    data: notify,
                });
            }
            else {
                return res.status(404).json({
                    message: "Please enter a session you'd like to work with...!",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "no school has been registered",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherNotification = viewTeacherNotification;
const viewStudentNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode: code,
        });
        const student = yield studentModel_1.default.findById(req.params.id);
        const school = yield schoolModel_1.default.findOne({
            schoolName: student.schoolName,
        });
        if (school) {
            if (getSession) {
                const notify = yield academicSessionModel_1.default
                    .findById({
                    _id: getSession._id,
                })
                    .populate({
                    path: "notification",
                    options: {
                        createdAt: -1,
                    },
                });
                return res.status(200).json({
                    message: "Here are data for this session...!",
                    data: notify,
                });
            }
            else {
                return res.status(404).json({
                    message: "Please enter a session you'd like to work with...!",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "no school has been registered",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentNotification = viewStudentNotification;
