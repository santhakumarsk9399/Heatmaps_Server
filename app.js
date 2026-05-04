const express = require("express");
const app = express();
const connectDB = require("./Config/dbConnection");
// const port = 7000;
const path = require("path");
var bodyParser = require('body-parser')
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.static("public"));


// Connect Database
connectDB();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
// Init Middleware
app.use(express.json({ extended: true }));
app.use(express.static(path.join("public")));


// Define Routes
app.use("/users", require("./modules/Users/user.route"));
app.use("/expenses", require("./modules/Expense/Expense.router"));
app.use("/heatmaps", require("./modules/Heatmaps/heatmap.router"));
app.use("/uploads", express.static("uploads"));
module.exports = app;

