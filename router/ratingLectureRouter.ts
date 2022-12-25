import {
  viewLectureRating,
  createLecture,
} from "../controller/ratingTeachingController";

import { Router } from "express";

const router = Router();

router.route("/:id/:lectureID/creating-lecture-rating").post(createLecture);
router.route("/:id/view-lecture-rating").get(viewLectureRating);

export default router;
