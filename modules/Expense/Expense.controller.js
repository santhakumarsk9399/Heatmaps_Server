const ExpenseData = require("../Expense/Expense.model");
const Users = require("../Users/user.model");
const mongoose = require("mongoose");

// get the generative ai data
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


exports.GetAllExpense = async (req, res) => {
  try {
    const Expense = await ExpenseData.find({});
    // .populate("Userid");

    if (!Expense) {
      res.status(404).json({ status: "Data Not Found !!" });
    } else {
      res.status(200).json(Expense);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.GetExpenseByUser = async (req, res) => {
  try {
    const userId = req.query.UserID;

    // 1️⃣ Check if UserID exists
    if (!userId) {
      return res.status(400).json({
        message: "UserID is required"
      });
    }

    // 2️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid UserID"
      });
    }

    // 3️⃣ Check if user exists
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    // 4️⃣ Get expenses
    const expenses = await ExpenseData.find({
      Userid: userId
    }).populate("Userid");

    if (!expenses.length) {
      return res.status(404).json({
        message: "No Expense Found"
      });
    }

    res.status(200).json(expenses);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// exports.GetDashData = async (req, res) => {
//   try {
//     const query = req.query.UserID;
//     const user = await Users.findOne({ _id: query });
//     const Expense = await ExpenseData.find({
//       Userid: { _id: query },
//     }).populate("Userid");
//     //  let data =  JSON.parse(JSON.stringify(Expense));

//       console.log(query ,'data');
//     //   console.log(ExpenseData);
//     var Data = [];
//     let DashListedItems = {
//       TotalExpends: 0,
//       TotalIncome: 0,
//       TotalSavings: 0,
//       MostSpends: 0,
//     };

//     if (!user) {
//       res.status(404).json({ status: "User Not Found !!" });
//     } else {
//       // Total Expends and Income
//       //------------------------------------------------//
//       TotalExpends = await ExpenseData.aggregate([
//         // { $match: { Userid: new ObjectId(objectIdValue) } },
//         { $match: { Userid: "673f081004d2c6891e276a1e" } },

//         {
//           $group: {
//             _id: "$Type",
//             TotalAmount: { $sum: "$Amount" },
//           },
//         },
//       ]);
//       console.log(TotalExpends, "TotalExpends");

//       /// -----------------------------------------------
//       DashListedItems.TotalExpends =
//         TotalExpends.length > 0 ? TotalExpends[1].TotalAmount : 0;
//       DashListedItems.TotalIncome =
//         TotalExpends.length > 1 ? TotalExpends[0].TotalAmount : 0;
//       DashListedItems.TotalSavings =
//         TotalExpends.length > 0 ? TotalExpends[2].TotalAmount : 0;
//       console.log(DashListedItems);
//       Data.push(DashListedItems);
//       res.json({ Data });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// exports.CreateExpense = async (req, res) => {
//   try {
//     let Expense = new ExpenseData(req.body);
//     const Expenses = await Expense.save();
//     if (!Expenses) {
//       res.status(404).json({ message: "Something Went Wrong !!" });
//     } else {
//       res.status(200).json({ message: "Expense Added.." });
//     }
//   } catch (err) {
//     console.log("error" + err);
//   }
// };
exports.CreateExpense = async (req, res) => {
  try {
    // const expense = new ExpenseData(req.body);
    const expense = new ExpenseData({
      ...req.body,
      Userid: "69b7a9944e393b6b2fc851d1" // 👈 temp user
    });
    const saved = await expense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: saved
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};
// exports.UpdateExpense = async (req, res) => {
//   try {

//     const id = req.query.id;
//     if (!id) {
//       return res.status(400).json({ message: "Expense ID required" });
//     }
//     const expense = await ExpenseData.findById(id);
//     if (!expense) {
//       return res.status(404).json({ message: "Expense Not Found" });
//     }
//     // const expense = new ExpenseData(req.body);
//     // const expense = new ExpenseData({
//     //   ...req.body,
//     //   Userid: "69b7a9944e393b6b2fc851d1" // 👈 temp user
//     // });
//     // const saved = await expense.save();

//     // res.status(201).json({
//     //   success: true,
//     //   message: "Expense updated successfully",
//     //   data: saved
//     // });

//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: err.message
//     });
//   }
// };
exports.UpdateExpense = async (req, res) => {
  try {
    const { id } = req.query;          // Expense ID
    const userId = req.user?.id || "69b7a9944e393b6b2fc851d1"; // from token (preferred) or body

    if (!id) {
      return res.status(400).json({ message: "Expense ID required" });
    }

    // 🔍 Find expense by ID + User
    const expense = await ExpenseData.findOne({ _id: id, Userid: userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    // ✏️ Update fields
    const updatedExpense = await ExpenseData.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true } // return updated document
    );

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ message: "Expense ID required" });
    }

    const expense = await ExpenseData.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense Not Found" });
    }

    await ExpenseData.findByIdAndDelete(id);

    res.status(200).json({ message: "Expense Deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get ai insights
exports.GetAIInsights = async (req, res) => {
  try {
    const userId = req.query.UserID;

    if (!userId) {
      return res.status(400).json({ message: "UserID required" });
    }

    // 🔥 1. Get user expenses
    const expenses = await ExpenseData.find({ Userid: userId });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found" });
    }

    // 🔥 2. Format data (VERY IMPORTANT)
    const formattedData = expenses.map(e => ({
      category: e.Category,
      amount: e.Amount,
      date: e.Date
    }));

    // 🔥 3. Create prompt
    const prompt = `
    You are a financial advisor AI.

    Analyze this expense data:
    ${JSON.stringify(formattedData)}

    Give:
    - Overspending categories
    - Saving suggestions
    - Monthly prediction

    Keep it short, clean, and user-friendly.
    Use ₹ currency.
    `;

    // 🔥 4. Call Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 🔥 5. Send response
    res.status(200).json({ insights: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};