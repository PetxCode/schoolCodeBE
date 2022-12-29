import {
  createSubject,
  reAssignSubjectTeacher,
  viewClassSubjects,
  assignSubjectToTeacher,
  createSingleSubject,
  createSubjectTeacherToSingle,
} from "../controller/subjectController";

import { Router } from "express";

const router = Router();

router.route("/:id/view-class-subject").get(viewClassSubjects);
router.route("/:id/create-class-subject").post(createSubject);
router.route("/:id/create-class-single-subject").post(createSingleSubject);
router
  .route("/:id/assign-subject-to-teacher")
  .post(createSubjectTeacherToSingle);

router
  .route("/:id/:subjectID/reassign-subject-teacher")
  .patch(reAssignSubjectTeacher);
router
  .route("/:id/:teacherID/assign-subject-teacher")
  .patch(assignSubjectToTeacher);

export default router;
