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
} from "../controller/schoolController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/").get(getSchools);
router.route("/:id").get(getSchool);

router.route("/:id").patch(upload, updateSchool);
router.route("/verified/:id").get(verifiedSchool);

router.route("/create").post(createSchool);
router.route("/login").post(loginSchool);

router.route("/reset/password").patch(resetPassword);
router.route("/:id/:token/reset").post(changePassword);

router.route("/:id/teachers").get(getSchoolTeacher);

export default router;
