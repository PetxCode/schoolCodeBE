import {
  getSchool,
  getSchools,
  createSchool,
  updateSchool,
  verifiedSchool,
  loginSchool,
  changePassword,
  resetPassword,
  getSchoolTeacher,
  getSchoolStudents,
  updateSchoolInfo,
} from "../controller/schoolController";
import upload from "../utils/multer";
import multer from "multer";
import { Router } from "express";

let uploadData = multer();

const router = Router();

router.route("/").get(getSchools);
router.route("/:id").get(getSchool);

router.route("/:id").patch(uploadData.single("image"), updateSchool);
router.route("/:id/info").patch(updateSchoolInfo);

router.route("/verified/:id").get(verifiedSchool);

router.route("/create").post(createSchool);
router.route("/login").post(loginSchool);

router.route("/reset/password").patch(resetPassword);
router.route("/:id/:token/reset").post(changePassword);

router.route("/:id/teachers").get(getSchoolTeacher);
router.route("/:id/students").get(getSchoolStudents);

export default router;
