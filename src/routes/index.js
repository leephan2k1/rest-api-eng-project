const userRoute = require("./user");

function route(app) {
  app.use("/user", userRoute);

  app.use("/", (req, res, next) => [
    res.status(200).json({
      message: "server ok !",
    }),
  ]);
}

module.exports = route;
