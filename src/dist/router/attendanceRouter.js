"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attendanceController_1 = require("../controller/attendanceController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/present").post(attendanceController_1.createAttendancePresent);
router.route("/:id/absent").post(attendanceController_1.createAttendanceAbsent);
router
    .route("/:id/teacher-viewing-student-attendance")
    .get(attendanceController_1.viewStudentAttendanceByTeacher);
router.route("/:id/viewing-student-attendance").get(attendanceController_1.viewStudentAttendance);
exports.default = router;
