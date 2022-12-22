"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const academicSessionController_1 = require("../controller/academicSessionController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-academic-session").post(academicSessionController_1.createAcademicSession);
router.route("/:id/view-academic-sessions").get(academicSessionController_1.viewPresentAcademicSession);
router.route("/:id/viewing-present-academic-session").get(academicSessionController_1.viewAcademicSession);
exports.default = router;
