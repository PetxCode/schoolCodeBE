"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expenseController_1 = require("../controller/expenseController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/:id/create-expense").post(expenseController_1.createExpense);
router.route("/:id/get-expense").get(expenseController_1.getExpense);
exports.default = router;
