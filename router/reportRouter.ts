import {
  createReportForTeacher,
  createReportForStudent,
  updateReportForStudent,
  viewSchoolReport,
  viewTeacherReport,
  viewStudentReport,
  updateStatusReport,
} from "../controller/reportController";

import { Router } from "express";

const router = Router();

router.route("/:id/create-teacher-report").post(createReportForTeacher);
router.route("/:id/create-student-report").post(createReportForStudent);
router.route("/:id/update-report").patch(updateReportForStudent);

router.route("/:id/view-school-report").get(viewSchoolReport);
router.route("/:id/view-teacher-report").get(viewTeacherReport);
router.route("/:id/view-student-report").get(viewStudentReport);
router.route("/:id/update-report").get(updateStatusReport);

export default router;
