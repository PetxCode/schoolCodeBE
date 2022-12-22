"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentController_1 = require("../controller/studentController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-student").post(studentController_1.createStudent);
router.route("/login").post(studentController_1.loginStudent);
router.route("/:id/:classID/assign-student").post(studentController_1.assigningStudentToClass);
exports.default = router;
