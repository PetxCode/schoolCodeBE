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
exports.viewLectureRating = exports.createLecture = void 0;
const classModel_1 = __importDefault(require("../model/classModel"));
const lectureModel_1 = __importDefault(require("../model/lectureModel"));
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const ratingTeachingModel_1 = __importDefault(require("../model/ratingTeachingModel"));
const createLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = crypto_1.default.randomBytes(3).toString("hex");
        const { ratingLecture } = req.body;
        const getStudent = yield studentModel_1.default.findById(req.params.id);
        const getLecture = yield lectureModel_1.default.findById(req.params.lectureID);
        const getTeacher = yield lectureModel_1.default.findOne({
            name: getLecture.teacherName,
        });
        const getClass = yield classModel_1.default.findOne({
            className: getLecture === null || getLecture === void 0 ? void 0 : getLecture.className,
        });
        // console.log(getTeacher);
        // console.log(getLecture);
        // console.log(getStudent);
        const dater = Date.now();
        if ((getStudent === null || getStudent === void 0 ? void 0 : getStudent.className) === (getClass === null || getClass === void 0 ? void 0 : getClass.className) || getLecture) {
            console.log("start");
            const ratingData = yield ratingTeachingModel_1.default.create({
                ratingLecture,
                time: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                className: getLecture === null || getLecture === void 0 ? void 0 : getLecture.className,
                studentName: getStudent === null || getStudent === void 0 ? void 0 : getStudent.name,
                lectureName: getLecture.subjectTopic,
                subjectName: getLecture.subjectName,
                subjectTeacher: getLecture === null || getLecture === void 0 ? void 0 : getLecture.teacherName,
            });
            //   var resData = getLecture!.ratingLecture
            //   .map((bill) => bill.pendingAmount)
            //   .reduce((acc, bill) => bill + acc);
            yield lectureModel_1.default.findByIdAndUpdate(req.params.lectureID, {}, { new: true });
            //   getLecture!.rating!.push(new mongoose.Types.ObjectId(ratingData._id));
            //   getLecture?.save();
            //   getTeacher!.rating!.push(new mongoose.Types.ObjectId(ratingData?._id));
            //   getTeacher?.save();
            return res.status(201).json({
                message: "lecture rated",
                data: ratingData,
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
exports.createLecture = createLecture;
const viewLectureRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield lectureModel_1.default.findById(req.params.id).populate({
            path: "rating",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "viewing lecture",
            data: rating,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewLectureRating = viewLectureRating;
// export const viewTopLecture = async (req: Request, res: Response) => {
//   try {
//     const test = await subjectModel.findById(req.params.id).populate({
//       path: "lecture",
//       options: {
//         sort: { createdAt: -1 },
//         limit: 1,
//       },
//     });
//     return res.status(200).json({
//       message: "viewing test",
//       data: test,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };
// export const viewTeacherLecture = async (req: Request, res: Response) => {
//   try {
//     const lecture = await teacherModel.findById(req.params.id).populate({
//       path: "lecture",
//       options: {
//         sort: { createdAt: -1 },
//         limit: 1,
//       },
//     });
//     return res.status(200).json({
//       message: "viewing lecture",
//       data: lecture,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };
// export const viewTeacherAllLecture = async (req: Request, res: Response) => {
//   try {
//     const lecture = await teacherModel.findById(req.params.id).populate({
//       path: "lecture",
//       options: {
//         sort: { createdAt: -1 },
//       },
//     });
//     return res.status(200).json({
//       message: "viewing lecture",
//       data: lecture,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };
