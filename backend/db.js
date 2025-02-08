const mongoose = require("mongoose");
const { number } = require("zod");

mongoose.connect(
  "mongodb+srv://harsh:harsh1010@cluster0.mima1.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  /* firstname: String,
  lastname: String,
  username: String,
  password: String, */

  username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String, 
    require: true,
    minLength: 6
  }
});

const tasksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: 'User',
    require: true
  },
  tasks: task,
});

const Tasks = mongoose.model("Account", tasksSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Tasks };