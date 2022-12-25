"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ratingTeachingController_1 = require("../controller/ratingTeachingController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/:lectureID/creating-lecture-rating").post(ratingTeachingController_1.createLecture);
router.route("/:id/view-lecture-rating").get(ratingTeachingController_1.viewLectureRating);
exports.default = router;
