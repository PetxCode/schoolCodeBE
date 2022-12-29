"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subjectController_1 = require("../controller/subjectController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/view-class-subject").get(subjectController_1.viewClassSubjects);
router.route("/:id/create-class-subject").post(subjectController_1.createSubject);
router.route("/:id/create-class-single-subject").post(subjectController_1.createSingleSubject);
router
    .route("/:id/assign-subject-to-teacher")
    .post(subjectController_1.createSubjectTeacherToSingle);
router
    .route("/:id/:subjectID/reassign-subject-teacher")
    .patch(subjectController_1.reAssignSubjectTeacher);
router
    .route("/:id/:teacherID/assign-subject-teacher")
    .patch(subjectController_1.assignSubjectToTeacher);
exports.default = router;
