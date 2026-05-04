const mongoose = require("mongoose");


const UserSchema =  new mongoose.Schema({

    name: {
        type : String,
        require: true,
        maxlength:30
    },
    age :{type : Number,
        require : true,
        maxlength:2
    },
    email :{
        type :String,
        require : true
    },
    mobile :{
        type :String,
        require : true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password must be less than 128 characters long'],
    },
    ExpenseId: { type: mongoose.Schema.Types.ObjectId, ref: "expenses" },
    lastLoginDateTime: { type: Date }
});
const User = new mongoose.model("Users", UserSchema)
module.exports = User;
