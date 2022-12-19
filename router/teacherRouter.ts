import {
  createTeacher,
  changePassword,
  resetPassword,
  verifiedTeacher,
  loginTeacher,
  updateTeacherImage,
  getSchoolTeacherInfo,
} from "../controller/teacherController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/verified/:id").get(verifiedTeacher);
router.route("/create").post(createTeacher);
router.route("/login").post(loginTeacher);

router.route("/:id/upload").patch(upload, updateTeacherImage);

router.route("/reset/password").patch(resetPassword);
router.route("/:id/:token/reset").post(changePassword);

router.route("/:id").get(getSchoolTeacherInfo);

export default router;
