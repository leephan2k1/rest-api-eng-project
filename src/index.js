require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const app = express();
const port = app.get("port") || 3000;
const route = require("./routes");
const db = require("./configure/db");
const helmet = require("helmet");
const createError = require("http-errors");
const logEvents = require("../src/helper/logEvents");
const { nanoid } = require("nanoid");

//connect mongodb
db.connect();

//middleware logger
app.use(logger("dev"));
//middleware body-parser
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//middleware prevent info header
app.use(helmet());

//route
route(app);

//catch 404
app.use((req, res, next) => {
  next(createError(404, "404 not found"));
});

//error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  //write log message
  logEvents(
    `id:${nanoid(5)} --- ${req.url} --- ${req.method} --- ${JSON.stringify({
      message: error.message,
    })}`
  );

  return res.status(status).json({
    status,
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
