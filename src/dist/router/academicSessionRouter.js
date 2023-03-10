"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const academicSessionController_1 = require("../controller/academicSessionController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-academic-session").post(academicSessionController_1.createAcademicSession);
router.route("/:id/find-academic-session").post(academicSessionController_1.findAcademicSession);
router
    .route("/:id/get-academic-session-teacher")
    .get(academicSessionController_1.AcademicSessionForTeacher);
router.route("/:id/view-academic-sessions").get(academicSessionController_1.viewAcademicSession);
router
    .route("/:id/viewing-present-academic-session")
    .get(academicSessionController_1.viewPresentAcademicSession);
exports.default = router;
