import {
  getSchool,
  getSchools,
  createSchool,
  updateSchool,
  verifiedSchool,
  loginSchool,
  changePassword,
  resetPassword,
} from "../controller/schoolController";

import { Router } from "express";

const router = Router();

router.route("/").get(getSchools);
router.route("/:id").get(getSchool);

router.route("/:id").patch(updateSchool);
router.route("/verified/:id").get(verifiedSchool);

router.route("/create").post(createSchool);
router.route("/login").post(loginSchool);

router.route("/reset/password").patch(resetPassword);
router.route("/:id/:token/reset").post(changePassword);

export default router;
