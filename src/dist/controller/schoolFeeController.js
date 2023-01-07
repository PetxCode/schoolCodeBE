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
exports.viewStudentSchoolFeeDetailByStudent = exports.viewStudentSchoolFeeDetail = exports.viewAcademicSessionPaySchoolFee = exports.createPaySchoolFeeByParant = exports.updatePaySchoolFeeByAdmin = exports.createPaySchoolFeeByAdmin = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const classModel_1 = __importDefault(require("../model/classModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const moment_1 = __importDefault(require("moment"));
const academicSessionModel_1 = __importDefault(require("../model/academicSessionModel"));
const schoolFeeModel_1 = __importDefault(require("../model/schoolFeeModel"));
const createPaySchoolFeeByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amountPaid, sessionCode } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getStudent = yield studentModel_1.default.findById(req.params.studentID);
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode,
        });
        const classFee = yield classModel_1.default.findOne({
            className: getStudent === null || getStudent === void 0 ? void 0 : getStudent.className,
        });
        if (getSchool) {
            const dater = Date.now();
            const paymentData = yield schoolFeeModel_1.default.create({
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                receiptToken: dater,
                date: `${(0, moment_1.default)(dater).format("dddd")}`,
                studentName: getStudent.name,
                studentClass: getStudent.className,
                academicTerm: getSession === null || getSession === void 0 ? void 0 : getSession.academicTerm,
                amountPaid,
                toBalance: (classFee === null || classFee === void 0 ? void 0 : classFee.termFee) - amountPaid,
                academicSession: getSession === null || getSession === void 0 ? void 0 : getSession.academicSession,
            });
            getSession.schoolFees.push(new mongoose_1.default.Types.ObjectId(paymentData._id));
            getSession === null || getSession === void 0 ? void 0 : getSession.save();
            getStudent.schoolFee.push(new mongoose_1.default.Types.ObjectId(paymentData._id));
            getStudent === null || getStudent === void 0 ? void 0 : getStudent.save();
            classFee.schoolFee.push(new mongoose_1.default.Types.ObjectId(paymentData._id));
            classFee === null || classFee === void 0 ? void 0 : classFee.save();
            return res.status(201).json({
                message: "payment of school fee recorded",
                data: paymentData,
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
exports.createPaySchoolFeeByAdmin = createPaySchoolFeeByAdmin;
const updatePaySchoolFeeByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amountPaid, sessionCode } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getStudent = yield studentModel_1.default.findById(req.params.studentID);
        const getPayment = yield schoolFeeModel_1.default.findById(req.params.paymentID);
        const getSession = yield academicSessionModel_1.default.findOne({
            sessionCode,
        });
        const classFee = yield classModel_1.default.findOne({
            className: getStudent === null || getStudent === void 0 ? void 0 : getStudent.className,
        });
        console.log(getPayment);
        if (getSchool) {
            const dater = Date.now();
            yield schoolFeeModel_1.default.findByIdAndUpdate(getPayment._id, {
                amountPaid: getPayment.amountPaid + amountPaid,
            });
            const paymentData = yield schoolFeeModel_1.default.findByIdAndUpdate(getPayment._id, {
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                receiptToken: dater,
                date: `${(0, moment_1.default)(dater).format("dddd")}`,
                toBalance: (classFee === null || classFee === void 0 ? void 0 : classFee.termFee) - getPayment.amountPaid,
            });
            getSession.schoolFees.push(new mongoose_1.default.Types.ObjectId(paymentData._id));
            getSession === null || getSession === void 0 ? void 0 : getSession.save();
            getStudent.schoolFee.push(new mongoose_1.default.Types.ObjectId(paymentData._id));
            getStudent === null || getStudent === void 0 ? void 0 : getStudent.save();
            return res.status(201).json({
                message: "payment of school fee recorded",
                data: paymentData,
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
exports.updatePaySchoolFeeByAdmin = updatePaySchoolFeeByAdmin;
const createPaySchoolFeeByParant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getStudent = yield studentModel_1.default.findById(req.params.id);
        const getSchool = yield schoolModel_1.default.findOne({
            schoolName: getStudent === null || getStudent === void 0 ? void 0 : getStudent.schoolName,
        });
        const getSession = yield academicSessionModel_1.default.findOne({
            schoolName: getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName,
        });
        const { academicTerm, amountPaid, toBalance, academicSession } = req.body;
        if (getStudent) {
            const dater = Date.now();
            const paymentData = yield academicSessionModel_1.default.create({
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                date: `${(0, moment_1.default)(dater).format("dddd")}`,
                studentName: getStudent.name,
                studentClass: getStudent.className,
                academicTerm,
                amountPaid,
                toBalance,
                academicSession,
            });
            getSession.schoolFees.push(new mongoose_1.default.Types.ObjectId(paymentData._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            return res.status(201).json({
                message: "payment of school fee recorded",
                data: paymentData,
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
exports.createPaySchoolFeeByParant = createPaySchoolFeeByParant;
const viewAcademicSessionPaySchoolFee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield schoolModel_1.default.findById(req.params.id);
        if (school) {
            const payment = yield academicSessionModel_1.default
                .findById(req.params.sessionID)
                .populate({
                path: "schoolFees",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });
            return res.status(200).json({
                message: `Viewing academic session payments...!`,
                data: payment,
            });
        }
        else {
            return res.status(200).json({
                message: `You can access this info`,
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewAcademicSessionPaySchoolFee = viewAcademicSessionPaySchoolFee;
const viewStudentSchoolFeeDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield schoolModel_1.default.findById(req.params.id);
        const student = yield studentModel_1.default.findById(req.params.studentID);
        if ((school === null || school === void 0 ? void 0 : school.schoolName) === (student === null || student === void 0 ? void 0 : student.schoolName)) {
            const studentDetail = yield studentModel_1.default
                .findById(req.params.studentID)
                .populate({
                path: "schoolFee",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });
            return res.status(200).json({
                message: `Viewing academic school fee detail...!`,
                data: studentDetail,
            });
        }
        else {
            return res.status(200).json({
                message: `something went wrong...!`,
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentSchoolFeeDetail = viewStudentSchoolFeeDetail;
const viewStudentSchoolFeeDetailByStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const school = await schoolModel.findById(req.params.id);
        const student = yield studentModel_1.default.findById(req.params.id);
        if (student) {
            const studentDetail = yield studentModel_1.default
                .findById(req.params.studentID)
                .populate({
                path: "schoolFee",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });
            return res.status(200).json({
                message: `Viewing academic school fee detail by student...!`,
                data: studentDetail,
            });
        }
        else {
            return res.status(200).json({
                message: `something went wrong...!`,
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentSchoolFeeDetailByStudent = viewStudentSchoolFeeDetailByStudent;
