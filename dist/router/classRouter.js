"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classController_1 = require("../controller/classController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/viewing-class").get(classController_1.viewClasses);
router.route("/:id/viewing-class").get(classController_1.viewClassDetailInfo);
router.route("/:id/viewing-school-class").get(classController_1.viewClassDetailFromSchool);
router.route("/:id/create-class").post(classController_1.createClass);
router.route("/:id/:classID/assign-teacher").patch(classController_1.assigClassTeacher);
exports.default = router;
