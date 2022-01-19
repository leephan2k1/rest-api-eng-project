const express = require("express");
const router = require("express-promise-router")();
const DeckController = require("../controllers/deck");
const { validateBody, schemas } = require("../helper/validateRouter");

//v1/users
router
  .route("/")
  .get(DeckController.index) // -> get all users
  .post(validateBody(schemas.deckSchema), DeckController.newDeck); // -> create a new user

module.exports = router;
