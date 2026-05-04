const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  Userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  Name: {
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
  Description: {
    type: String,
    required: [true, "Description is required"],
  },
  Reference: {
    type: String,
    require: true,
  }
});
const ExpenseData = new mongoose.model("expenses", ExpenseSchema);
module.exports = ExpenseData;
