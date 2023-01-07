"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testController_1 = require("../controller/testController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/:subjectID/creating-test").post(testController_1.createTest);
router.route("/:id/view-class-test").get(testController_1.viewTest);
router.route("/:id/view-class-test-now").get(testController_1.viewClassTest);
router.route("/:id/view-recent-test").get(testController_1.viewTopTest);
// get single test data
router.route("/:id/view-single-test").get(testController_1.viewSingleTest);
router.route("/:id/view-all-teacher-test").get(testController_1.viewTeacherAllTest);
router.route("/:id/view-teacher-recent-tests").get(testController_1.viewTeacherTest);
exports.default = router;
