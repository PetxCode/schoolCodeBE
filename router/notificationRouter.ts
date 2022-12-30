import {
  createNotification,
  viewSchoolNotification,
  viewTeacherNotification,
  viewStudentNotification,
  viewSchoolNotificationOne,
} from "../controller/notificationController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/:id/create-announcement").post(createNotification);

router.route("/:id/viewing-announcement-school").post(viewSchoolNotification);
router
  .route("/:id/viewing-announcement-school-one")
  .post(viewSchoolNotificationOne);

router.route("/:id/viewing-announcement-teacher").post(viewTeacherNotification);

router.route("/:id/viewing-announcement-student").post(viewStudentNotification);

export default router;
