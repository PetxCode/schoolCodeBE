"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notificationController_1 = require("../controller/notificationController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-announcement").post(notificationController_1.createNotification);
router.route("/:id/viewing-announcement-school").post(notificationController_1.viewSchoolNotification);
router
    .route("/:id/viewing-announcement-school-one")
    .post(notificationController_1.viewSchoolNotificationOne);
router.route("/:id/viewing-announcement-teacher").post(notificationController_1.viewTeacherNotification);
router.route("/:id/viewing-announcement-student").post(notificationController_1.viewStudentNotification);
exports.default = router;
