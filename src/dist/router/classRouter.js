"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classController_1 = require("../controller/classController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/viewing-class").get(classController_1.viewClasses);
router.route("/:id/viewing-class").get(classController_1.viewClassDetailInfo);
router.route("/:id/viewing-class-payment").get(classController_1.viewClassSchoolFeeInfo);
router.route("/:id/viewing-class-students").get(classController_1.viewClassStudents);
router.route("/:id/viewing-school-class").get(classController_1.viewClassDetailFromSchool);
router.route("/:id/create-class").post(classController_1.createClass);
router.route("/:id/:teacherID/assign-teacher").post(classController_1.assigClassTeacher);
router
    .route("/:id/:classID/assign-teacher-class")
    .post(classController_1.assigClassTeacherToClass);
router.route("/:id/:classID/update-class-fee").patch(classController_1.updateClassFee);
exports.default = router;
