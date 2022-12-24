"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notificationController_1 = require("../controller/notificationController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-announcement").post(notificationController_1.createNotification);
router.route("/:id/viewing-announcement-school").get(notificationController_1.viewSchoolNotification);
router
    .route("/:id/viewing-announcement-school-one")
    .get(notificationController_1.viewSchoolNotificationOne);
router.route("/:id/viewing-announcement-teacher").get(notificationController_1.viewTeacherNotification);
router.route("/:id/viewing-announcement-student").get(notificationController_1.viewStudentNotification);
exports.default = router;
