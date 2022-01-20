const userRoute = require("./user");
const deckRoute = require("./deck");

function route(app) {
  const version = "v1";

  app.use(`/${version}/users`, userRoute);

  app.use(`/${version}/decks`, deckRoute);
}

module.exports = route;
