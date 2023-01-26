"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentController_1 = require("../controller/studentController");
const multer_1 = __importDefault(require("multer"));
let uploadData = (0, multer_1.default)();
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-student").post(studentController_1.createStudent);
router.route("/login").post(studentController_1.loginStudent);
router.route("/:id/:classID/assign-student").post(studentController_1.assigningStudentToClass);
router.route("/:id/:studentID/view-student").get(studentController_1.viewStudent);
router.route("/:id/student-detail").get(studentController_1.viewStudentDetail);
router.route("/:id/student-detail-school").get(studentController_1.viewStudentDetailSchool);
router
    .route("/:id/update-student")
    .patch(uploadData.single("image"), studentController_1.updateStudent);
router.route("/:id/update-student-info").patch(studentController_1.updateStudentInfo);
exports.default = router;
