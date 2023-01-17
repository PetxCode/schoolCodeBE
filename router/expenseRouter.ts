import { createExpense, getExpense } from "../controller/expenseController";

import { Router } from "express";

const router = Router();

router.route("/:id/create-expense").post(createExpense);

router.route("/:id/get-expense").get(getExpense);

export default router;
