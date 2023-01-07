import {
  createClass,
  assigClassTeacher,
  viewClassDetailFromSchool,
  viewClasses,
  viewClassDetailInfo,
  viewClassStudents,
  updateClassFee,
  viewClassSchoolFeeInfo,
  assigClassTeacherToClass,
  assigClassStudent,
  viewClassStudentSubject,
} from "../controller/classController";

import { Router } from "express";

const router = Router();

router.route("/viewing-class").get(viewClasses);
router.route("/:id/viewing-class").get(viewClassDetailInfo);
router.route("/:id/viewing-class-payment").get(viewClassSchoolFeeInfo);
router.route("/:id/viewing-class-students").get(viewClassStudents);
router.route("/:id/viewing-student-class-subject").get(viewClassStudentSubject);

router.route("/:id/viewing-school-class").get(viewClassDetailFromSchool);
router.route("/:id/create-class").post(createClass);
router.route("/:id/:teacherID/assign-teacher").post(assigClassTeacher);
router.route("/:id/:studentID/assign-student").post(assigClassStudent);
router
  .route("/:id/:classID/assign-teacher-class")
  .post(assigClassTeacherToClass);
router.route("/:id/:classID/update-class-fee").patch(updateClassFee);

export default router;
