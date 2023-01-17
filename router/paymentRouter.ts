import {
  createPayTeacher,
  updateTeacherPay,
  viewTeacherPayment,
  viewSchoolPayment,
} from "../controller/payRollController";

import { Router } from "express";

const router = Router();

router.route("/:id/:teacherID/create-teacher-payment").post(createPayTeacher);
router.route("/:id/:paymentID/update-payment").patch(updateTeacherPay);
router.route("/:id/get-teacher-payment-record").get(viewTeacherPayment);

router.route("/:id/get-school-payment-record").get(viewSchoolPayment);

export default router;
