import {
  createTest,
  viewTeacherAllTest,
  viewTeacherTest,
  viewTopTest,
  viewTest,
} from "../controller/testController";

import { Router } from "express";

const router = Router();

router.route("/:id/creating-test").post(createTest);
router.route("/:id/view-class-test").get(viewTest);
router.route("/:id/view-assign-test").get(viewTopTest);

router.route("/:id/view-teacher-test").get(viewTeacherAllTest);
router.route("/:id/view-teacher-assign-test").get(viewTeacherTest);

export default router;
