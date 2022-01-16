const express = require("express");
const res = require("express/lib/response");
const logger = require("morgan");
const app = express();
const port = app.get("port") || 3000;
const route = require("./routes");
const db = require("./configure/db");

//connect mongodb
db.connect();

//middleware logger
app.use(logger("dev"));

//route
route(app);

//catch 404
app.use((req, res, next) => {
  const err = new Error("404");
  err.status = 404;
  next(err);
});

//error handler
app.use(() => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  return res.status(status).json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
