import {
  createSubject,
  reAssignSubjectTeacher,
  viewClassSubjects,
} from "../controller/subjectController";

import { Router } from "express";

const router = Router();

router.route("/:id/view-class-subject").get(viewClassSubjects);
router.route("/:id/create-class-subject").post(createSubject);
router
  .route("/:id/:subjectID/reassign-subject-teacher")
  .patch(reAssignSubjectTeacher);

//   router
//     .route("/:id/teacher-viewing-student-attendance")
//     .get(viewStudentAttendanceByTeacher);

//   router.route("/:id/viewing-student-attendance").get(viewStudentAttendance);

export default router;
