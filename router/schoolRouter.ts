import {
  getSchool,
  getSchools,
  createSchool,
  updateSchool,
} from "../controller/schoolController";

import { Router } from "express";

const router = Router();

router.route("/").get(getSchools);
router.route("/:id").get(getSchool);
router.route("/:id").patch(updateSchool);
router.route("/create").post(createSchool);

export default router;
