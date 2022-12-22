import {
  createClass,
  assigClassTeacher,
  viewClassDetailFromSchool,
  viewClasses,
  viewClassDetailInfo,
  viewClassStudents,
} from "../controller/classController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/viewing-class").get(viewClasses);
router.route("/:id/viewing-class").get(viewClassDetailInfo);
router.route("/:id/viewing-class-students").get(viewClassStudents);
router.route("/:id/viewing-school-class").get(viewClassDetailFromSchool);
router.route("/:id/create-class").post(createClass);
router.route("/:id/:classID/assign-teacher").patch(assigClassTeacher);

export default router;
