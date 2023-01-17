import {
  createPerformance,
  viewPerformance,
  recentPerformance,
  createGeneralPerformance,
} from "../controller/performanceController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router.route("/:id/create-student-performance").post(createPerformance);
router.route("/:id/general-student-performance").get(createGeneralPerformance);
router.route("/:id/viewing-student-performance").get(viewPerformance);

router.route("/:id/viewing-student-recent-performance").get(recentPerformance);

export default router;
