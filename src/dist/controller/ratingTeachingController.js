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
const mongoose_1 = __importDefault(require("mongoose"));
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
        let getRated = yield ratingTeachingModel_1.default.findOne({
            studentName: getStudent === null || getStudent === void 0 ? void 0 : getStudent.name,
        });
        let getRatedCoded = yield ratingTeachingModel_1.default.findOne({
            lectureCode: "e6036f",
        });
        const dater = Date.now();
        if ((getStudent === null || getStudent === void 0 ? void 0 : getStudent.className) === (getClass === null || getClass === void 0 ? void 0 : getClass.className) || getLecture) {
            // console.log(getLecture!.rated!.length);
            // if (getLecture!.rated!.length > 0) {
            //   console.log("got it: ", getRated!._id.toString());
            //   console.log("got it array: ", getLecture!.rated!);
            //   console.log(
            //     "got it array: ",
            //     getLecture!.rated!.includes(getRated!._id === getRatedCoded!._id)
            //   );
            //   const dataID = getRated!._id.toString();
            //   if (getLecture!.rated!.includes("63bd67f8d2d84919740cc44c")) {
            //     // const ratedData = await ratingTeachingModel.findByIdAndUpdate(
            //     //   getRated!._id,
            //     //   { ratingLecture },
            //     //   { new: true }
            //     // );
            //     // const lectureData = await lectureModel
            //     //   .findById(req.params.lectureID)
            //     //   .populate({
            //     //     path: "rated",
            //     //     options: {
            //     //       sort: { createdAt: -1 },
            //     //     },
            //     //   });
            //     // const sumData = lectureData!.rated!.map((rate: any) => {
            //     //   return rate!.ratingLecture;
            //     // });
            //     // const totalRated = sumData.reduce((a: number, b: number) => {
            //     //   return a + b;
            //     // }, 0);
            //     // await lectureModel.findByIdAndUpdate(
            //     //   req.params.lectureID,
            //     //   {
            //     //     lecturePerformance: parseInt(
            //     //       (totalRated / lectureData!.rated!.length).toFixed(2)
            //     //     ),
            //     //   },
            //     //   { new: true }
            //     // );
            //     return res.status(200).json({
            //       message: "rating Lecture updated",
            //       // data: ratedData
            //     });
            //   }
            // }
            const ratingData = yield ratingTeachingModel_1.default.create({
                ratingLecture,
                time: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                className: getLecture === null || getLecture === void 0 ? void 0 : getLecture.className,
                studentName: getStudent === null || getStudent === void 0 ? void 0 : getStudent.name,
                lectureName: getLecture.lectureTopic,
                subjectName: getLecture.subjectName,
                subjectTeacher: getLecture === null || getLecture === void 0 ? void 0 : getLecture.teacherName,
            });
            getLecture.rated.push(new mongoose_1.default.Types.ObjectId(ratingData === null || ratingData === void 0 ? void 0 : ratingData._id));
            getLecture === null || getLecture === void 0 ? void 0 : getLecture.save();
            getTeacher.rated.push(new mongoose_1.default.Types.ObjectId(ratingData === null || ratingData === void 0 ? void 0 : ratingData._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            const lectureData = yield lectureModel_1.default
                .findById(req.params.lectureID)
                .populate({
                path: "rated",
                options: {
                    sort: { createdAt: -1 },
                },
            });
            const sumData = lectureData.rated.map((rate) => {
                return rate.ratingLecture;
            });
            const totalRated = sumData.reduce((a, b) => {
                return a + b;
            }, 0);
            const value = totalRated / lectureData.rated.length;
            yield lectureModel_1.default.findByIdAndUpdate(req.params.lectureID, {
                lecturePerformance: value.toFixed(2),
            }, { new: true });
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
            path: "rated",
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
