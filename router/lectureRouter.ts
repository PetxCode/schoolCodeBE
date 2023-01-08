import {
  createLecture,
  viewLecture,
  viewTopLecture,
  viewTeacherLecture,
  viewTeacherAllLecture,
} from "../controller/lectureController";

import { Router } from "express";

const router = Router();

router.route("/:id/creating-lecture").post(createLecture);
router.route("/:id/view-class-lecture").get(viewLecture);
router.route("/:id/view-recent-lecture").get(viewTopLecture);

router.route("/:id/view-all-teacher-lecture").get(viewTeacherAllLecture);
router.route("/:id/view-teacher-recent-lecture").get(viewTeacherLecture);

export default router;
