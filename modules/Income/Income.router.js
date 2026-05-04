const express = require("express");
const router = express.Router();
const {
  CreateExpense,
  GetAllExpense,
  // GetDashData,
  GetExpenseByUser,
  deleteExpense,
} = require("../Expense/Expense.controller");

router.get("/GetAllExpense", GetAllExpense);
router.get("/GetExpense", GetExpenseByUser);
// router.get("/GetDash", GetDashData);
router.post("/AddExpense", CreateExpense);
router.delete("/DeleteExpense", deleteExpense);
// router.post("/userCreate",CreateAllUsers);
// router.put("/userUpdate/:id",UpdateUser)
// router.delete("/deleteUser/:id",DeleteUser)
module.exports = router;
