import {
  createSubject,
  reAssignSubjectTeacher,
  viewClassSubjects,
  assignSubjectToTeacher,
} from "../controller/subjectController";

import { Router } from "express";

const router = Router();

router.route("/:id/view-class-subject").get(viewClassSubjects);
router.route("/:id/create-class-subject").post(createSubject);
router
  .route("/:id/:subjectID/reassign-subject-teacher")
  .patch(reAssignSubjectTeacher);
router
  .route("/:id/:teacherID/assign-subject-teacher")
  .patch(assignSubjectToTeacher);

export default router;
