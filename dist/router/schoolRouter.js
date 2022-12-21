"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schoolController_1 = require("../controller/schoolController");
const multer_1 = __importDefault(require("../utils/multer"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/").get(schoolController_1.getSchools);
router.route("/:id").get(schoolController_1.getSchool);
router.route("/:id").patch(multer_1.default, schoolController_1.updateSchool);
router.route("/verified/:id").get(schoolController_1.verifiedSchool);
router.route("/create").post(schoolController_1.createSchool);
router.route("/login").post(schoolController_1.loginSchool);
router.route("/reset/password").patch(schoolController_1.resetPassword);
router.route("/:id/:token/reset").post(schoolController_1.changePassword);
router.route("/:id/teachers").get(schoolController_1.getSchoolTeacher);
exports.default = router;
