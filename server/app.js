const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");
const problemRouter = require("./routes/problem");

app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/problem", problemRouter);

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`);
});

module.exports = app;
