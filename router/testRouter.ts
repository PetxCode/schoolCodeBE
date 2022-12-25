import {
  createTest,
  viewTeacherAllTest,
  viewTeacherTest,
  viewTopTest,
  viewTest,
} from "../controller/testController";

import { Router } from "express";

const router = Router();

router.route("/:id/:subjectID/creating-test").post(createTest);
router.route("/:id/view-class-test").get(viewTest);
router.route("/:id/view-recent-test").get(viewTopTest);

router.route("/:id/view-all-teacher-test").get(viewTeacherAllTest);
router.route("/:id/view-teacher-recent-tests").get(viewTeacherTest);

export default router;
