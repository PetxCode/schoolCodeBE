import {
  createEvent,
  viewSchoolEvent,
  viewTeacherEvent,
  viewStudentEvent,
  updateEvent,
} from "../controller/eventController";

import { Router } from "express";

const router = Router();

router.route("/:id/create-event").post(createEvent);
router.route("/:id/:eventID/update-event").patch(updateEvent);

router.route("/:id/viewing-event-school").get(viewSchoolEvent);

router.route("/:id/viewing-event-teacher").get(viewTeacherEvent);

router.route("/:id/viewing-event-student").get(viewStudentEvent);

export default router;
