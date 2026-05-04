// const mongoose = require("mongoose");
// const config = require("config");

// // const urlStr ="mongodb://localhost:27017/ExpenseTracker";
// // const urlStr ="mongodb+srv://santhakumar:santha123@cluster0.45epy.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0";
// // mongodb + srv://i05_db_user:yourPassword@tracker.sjovqja.mongodb.net/ExpenseTracker?retryWrites=true&w=majority
// const urlStr = "mongodb + srv://imkriz505_db_user:RrRyePJQUUILMkN3@tracker.sjovqja.mongodb.net//ExpenseTracker?retryWrites=true&w=majority"
// process.env.MONGO_URL
// const connectDB = async () => {
//   try {
//     await mongoose.connect(urlStr, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     //   useCreateIndex: true,
//     //   useFindAndModify: false,
//     });
//     console.log(`MongoDB Connected`);
//   } catch (error) {
//     console.error(error.message);
//     // Exit process with db connection failure
//     // process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;