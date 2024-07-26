const Quiz = require("../models/quiz.model");
module.exports.createQuestions = async (req, res) => {
  try {
    const { question, options, answer } = req.body;

    if (!question || !options || !answer) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const quizDetails = await Quiz.create({
      question: question,
      options: options,
      answer: answer,
    });

    return res.status(200).json({
      message: "Questions Details Entered Successfully..",
      quizDetails: quizDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Quiz.find();
    return res.status(200).json({
      message: "All Users Details",
      questions: allQuestions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.updateQuestions = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { question, options, answer } = req.body;

    if (!questionId || !question || !options || !answer) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingQuestion = await Quiz.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({
        message: "Question not found",
      });
    }
    existingQuestion.question = question;
    existingQuestion.options = options;
    existingQuestion.answer = answer;

    const updateQuestion = await existingQuestion.save();

    return res.status(200).json({
      message: "Questions Details Updated Successfully..",
      quizDetails: updateQuestion,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Quiz.findById(questionId);
    if (!question) {
      return res.status(400).json({
        message: "Question Not Found",
      });
    }
    return res.status(200).json({
      message: "Get Question By Id",
      question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.deleteQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const deleteQuestion = await Quiz.findOneAndDelete({ _id: questionId });
    if (!deleteQuestion) {
      return res.status(400).json({
        message: "Question not found..",
      });
    }
    return res.status(200).json({
      message: "Question Deleted Successufull..!",
      deleteQuestion,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
