import {
  viewPresentAcademicSession,
  createAcademicSession,
  viewAcademicSession,
  findAcademicSession,
} from "../controller/academicSessionController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/:id/create-academic-session").post(createAcademicSession);
router.route("/:id/find-academic-session").post(findAcademicSession);

router.route("/:id/view-academic-sessions").get(viewAcademicSession);

router
  .route("/:id/viewing-present-academic-session")
  .get(viewPresentAcademicSession);

export default router;
