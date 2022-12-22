"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schoolFeeController_1 = require("../controller/schoolFeeController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route("/:id/:studentID/student-school-fee")
    .post(schoolFeeController_1.createPaySchoolFeeByAdmin);
router.route("/:id/student-school-fee-parent").post(schoolFeeController_1.createPaySchoolFeeByParant);
router
    .route("/:id/:studentID/:paymentID/update-student-school-fee-parent")
    .patch(schoolFeeController_1.updatePaySchoolFeeByAdmin);
router
    .route("/:id/:sessionID/view-student-school-fee")
    .get(schoolFeeController_1.viewAcademicSessionPaySchoolFee);
exports.default = router;
