import {
  assigningStudentToClass,
  createStudent,
  loginStudent,
  viewStudent,
  viewStudentDetail,
  viewStudentDetailSchool,
  updateStudent,
  updateStudentInfo,
} from "../controller/studentController";
import multer from "multer";
let uploadData = multer();
import { Router } from "express";

const router = Router();

router.route("/:id/create-student").post(createStudent);
router.route("/login").post(loginStudent);

router.route("/:id/:classID/assign-student").post(assigningStudentToClass);
router.route("/:id/:studentID/view-student").get(viewStudent);
router.route("/:id/student-detail").get(viewStudentDetail);
router.route("/:id/student-detail-school").get(viewStudentDetailSchool);

router
  .route("/:id/update-student")
  .patch(uploadData.single("image"), updateStudent);
router.route("/:id/update-student-info").patch(updateStudentInfo);

export default router;
