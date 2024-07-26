const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
router.post("/createQuestions", quizController.createQuestions);
router.get("/getAllQuestions", quizController.getAllQuestions);
router.put("/updateQuestion/:questionId", quizController.updateQuestions);
router.get("/getQuestion/:questionId", quizController.getQuestionById);
router.delete("/deleteQuestion/:questionId", quizController.deleteQuestionById);

module.exports = router;
