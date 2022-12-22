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
exports.viewClasses = exports.viewClassDetailInfo = exports.viewClassStudents = exports.viewClassDetailFromSchool = exports.assigClassTeacher = exports.updateClassFee = exports.createClass = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const classModel_1 = __importDefault(require("../model/classModel"));
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className, termFee } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        if (getSchool) {
            const code = crypto_1.default.randomBytes(2).toString("hex");
            const classes = yield classModel_1.default.create({
                className,
                termFee,
                classToken: code,
                schoolName: getSchool.schoolName,
            });
            getSchool.classes.push(new mongoose_1.default.Types.ObjectId(classes._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            return res.status(201).json({
                message: "class created",
                data: classes,
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
exports.createClass = createClass;
const updateClassFee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, termFee } = req.body;
        const school = yield schoolModel_1.default.findById(req.params.id);
        const classes = yield classModel_1.default.findById(req.params.classID);
        if ((classes === null || classes === void 0 ? void 0 : classes.schoolName) === (school === null || school === void 0 ? void 0 : school.schoolName)) {
            yield classModel_1.default.findByIdAndUpdate(req.params.classID, {
                termFee,
            }, { new: true });
            return res.status(200).json({
                message: `class fee has been updated...!`,
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
exports.updateClassFee = updateClassFee;
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
const viewClassStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classStudents = yield classModel_1.default.findById(req.params.id);
        const code = crypto_1.default.randomBytes(2).toString("hex");
        if (classStudents) {
            const myClass = yield classModel_1.default.findById(classStudents._id).populate({
                path: "students",
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
exports.viewClassStudents = viewClassStudents;
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
