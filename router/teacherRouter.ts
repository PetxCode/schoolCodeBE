import {
  createTeacher,
  changePassword,
  resetPassword,
  verifiedTeacher,
  loginTeacher,
  updateTeacherImage,
  getSchoolTeacherInfo,
  getSchoolTeacherInfoForClasses,
  assignTeacherPay,
  updateTeacher,
  updateTeacherInfo,
} from "../controller/teacherController";
import upload from "../utils/multer";

import { Router } from "express";
import multer from "multer";
let uploadData = multer();

const router = Router();

router.route("/verified/:id").get(verifiedTeacher);
router.route("/create").post(createTeacher);
router.route("/login").post(loginTeacher);

router.route("/:id/upload").patch(uploadData.single("image"), updateTeacher);
router.route("/:id/update-info").patch(updateTeacherInfo);

router.route("/reset/password").patch(resetPassword);
router.route("/:id/:token/reset").post(changePassword);

router.route("/:id").get(getSchoolTeacherInfo);
router.route("/:id/get-classes").get(getSchoolTeacherInfoForClasses);

router.route("/:id/:teacherID/update-teacher-payment").patch(assignTeacherPay);

export default router;
