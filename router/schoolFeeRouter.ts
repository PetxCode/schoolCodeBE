import {
  createPaySchoolFeeByAdmin,
  createPaySchoolFeeByParant,
  viewAcademicSessionPaySchoolFee,
  updatePaySchoolFeeByAdmin,
  viewStudentSchoolFeeDetail,
  viewStudentSchoolFeeDetailByStudent,
} from "../controller/schoolFeeController";
import upload from "../utils/multer";

import { Router } from "express";

const router = Router();

router
  .route("/:id/:studentID/student-school-fee")
  .post(createPaySchoolFeeByAdmin);

router.route("/:id/student-school-fee-parent").post(createPaySchoolFeeByParant);

router
  .route("/:id/:studentID/:paymentID/update-student-school-fee")
  .patch(updatePaySchoolFeeByAdmin);

router
  .route("/:id/:sessionID/view-student-school-fee")
  .get(viewAcademicSessionPaySchoolFee);

router
  .route("/:id/:studentID/view-student-school-fee-detail")
  .get(viewStudentSchoolFeeDetail);

router
  .route("/:id/view-student-school-fee-detail-by-student")
  .get(viewStudentSchoolFeeDetailByStudent);

export default router;
