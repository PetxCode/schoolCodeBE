import {
  assigningStudentToClass,
  createStudent,
  loginStudent,
  viewStudent,
  viewStudentDetail,
  viewStudentDetailSchool,
} from "../controller/studentController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/:id/create-student").post(createStudent);
router.route("/login").post(loginStudent);

router.route("/:id/:classID/assign-student").post(assigningStudentToClass);
router.route("/:id/:studentID/view-student").get(viewStudent);
router.route("/:id/student-detail").get(viewStudentDetail);
router.route("/:id/student-detail-school").get(viewStudentDetailSchool);

export default router;
