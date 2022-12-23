import {
  createNotification,
  viewSchoolNotification,
  viewTeacherNotification,
  viewStudentNotification,
} from "../controller/notificationController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/:id/create-announcement").post(createNotification);

router.route("/:id/viewing-announcement-school").get(viewSchoolNotification);

router.route("/:id/viewing-announcement-teacher").get(viewTeacherNotification);

router.route("/:id/viewing-announcement-student").get(viewStudentNotification);

export default router;
