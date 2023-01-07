import {
  createTest,
  viewTeacherAllTest,
  viewTeacherTest,
  viewTopTest,
  viewTest,
  viewSingleTest,
  viewClassTest,
} from "../controller/testController";
import { createTestOption } from "../controller/mainTest";

import { Router } from "express";

const router = Router();

router.route("/:id/:subjectID/creating-test").post(createTest);
router.route("/:id/creating-option").post(createTestOption);
router.route("/:id/view-class-test").get(viewTest);
router.route("/:id/view-class-test-now").get(viewClassTest);
router.route("/:id/view-recent-test").get(viewTopTest);

// get single test data
router.route("/:id/view-single-test").get(viewSingleTest);

router.route("/:id/view-all-teacher-test").get(viewTeacherAllTest);
router.route("/:id/view-teacher-recent-tests").get(viewTeacherTest);

export default router;
