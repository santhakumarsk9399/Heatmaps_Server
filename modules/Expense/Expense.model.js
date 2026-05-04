const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  Userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  Title: {
    type: String,
    required: [true, "Name is required"],
    maxlength: 100,
  },
  Amount: { type: Number, 
    required: [true, "Amount is required"],  },
  Category: {
    type: String,
    required: [true, "Category is required"],
  },
  Type: {
    type: String,
    required: [true, "Type is required"],
  },
  Date: {
    type: String,
    required: [true, "Date is required"],
  },
  Notes: {
    type: String,
  }
}, {timestamps: true});
const ExpenseData = new mongoose.model("expenses", ExpenseSchema);
module.exports = ExpenseData;
