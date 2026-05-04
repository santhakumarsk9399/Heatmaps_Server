const express = require("express");
const router = express.Router();
const {
  CreateExpense,
  GetAllExpense,
  // GetDashData,
  GetExpenseByUser,
  deleteExpense,
  GetAIInsights,
  UpdateExpense,
} = require("../Expense/Expense.controller");

router.get("/GetAllExpense", GetAllExpense);
router.get("/GetExpense", GetExpenseByUser);
router.post("/AddExpense", CreateExpense);
router.put("/UpdateExpense",UpdateExpense)
router.delete("/DeleteExpense", deleteExpense);
router.get("/getAiInsights",GetAIInsights)

module.exports = router;
