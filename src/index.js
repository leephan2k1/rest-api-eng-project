const express = require("express");
const res = require("express/lib/response");
const logger = require("morgan");
const app = express();
const port = app.get("port") || 3000;
const route = require("./routes");
const db = require("./configure/db");
const helmet = require("helmet");

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
  const err = new Error("404");
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  return res.status(status).json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
