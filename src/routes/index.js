const userRoute = require("./user");

function route(app) {
  const version = "v1";

  app.use(`/${version}/users`, userRoute);

  app.use(`/${version}/`, (req, res, next) => [
    res.status(200).json({
      message: "server ok !",
    }),
  ]);
}

module.exports = route;
