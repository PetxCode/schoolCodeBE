import {
  createClass,
  assigClassTeacher,
  viewClassDetailFromSchool,
  viewClasses,
  viewClassDetailInfo,
  viewClassStudents,
  updateClassFee,
  viewClassSchoolFeeInfo,
} from "../controller/classController";

import { Router } from "express";

const router = Router();

router.route("/viewing-class").get(viewClasses);
router.route("/:id/viewing-class").get(viewClassDetailInfo);
router.route("/:id/viewing-class-payment").get(viewClassSchoolFeeInfo);
router.route("/:id/viewing-class-students").get(viewClassStudents);
router.route("/:id/viewing-school-class").get(viewClassDetailFromSchool);
router.route("/:id/create-class").post(createClass);
router.route("/:id/:classID/assign-teacher").patch(assigClassTeacher);
router.route("/:id/:classID/update-class-fee").patch(updateClassFee);

export default router;
