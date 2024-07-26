const express = require("express");
const dateBaseConnection = require("./config/dateBase");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userRouter = require("./routes/user.routes");
const quizRouter = require("./routes/quiz.routes");

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", userRouter);
app.use("/admin", quizRouter);

//Database Connextion
dateBaseConnection();

//App Lister
const portNo = process.env.PORT_NO;
app.listen(portNo, () => {
  console.log(`server is running on ${portNo}`);
});

//welcome page
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to User Registration",
  });
});
