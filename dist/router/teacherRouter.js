"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teacherController_1 = require("../controller/teacherController");
const multer_1 = __importDefault(require("../utils/multer"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/verified/:id").get(teacherController_1.verifiedTeacher);
router.route("/create").post(teacherController_1.createTeacher);
router.route("/login").post(teacherController_1.loginTeacher);
router.route("/:id/upload").patch(multer_1.default, teacherController_1.updateTeacherImage);
router.route("/reset/password").patch(teacherController_1.resetPassword);
router.route("/:id/:token/reset").post(teacherController_1.changePassword);
router.route("/:id").get(teacherController_1.getSchoolTeacherInfo);
exports.default = router;
