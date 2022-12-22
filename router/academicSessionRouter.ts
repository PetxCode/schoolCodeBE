import {
  viewPresentAcademicSession,
  createAcademicSession,
  viewAcademicSession,
} from "../controller/academicSessionController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/:id/create-academic-session").post(createAcademicSession);

router.route("/:id/view-academic-sessions").get(viewPresentAcademicSession);

router.route("/:id/viewing-present-academic-session").get(viewAcademicSession);

export default router;
