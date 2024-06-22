const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const loginRouter = require("./routes/api/users");
const lotsRouter = require("./routes/api/lots");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api", lotsRouter);
app.use("/api/users", loginRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
