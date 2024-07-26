const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Quiz = mongoose.model("Quiz-Questions", quizSchema);
module.exports = Quiz;
