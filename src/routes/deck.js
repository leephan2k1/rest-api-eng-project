const express = require("express");
const router = require("express-promise-router")();
const DeckController = require("../controllers/deck");
const {
  validateParams,
  validateBody,
  schemas,
} = require("../helper/validateRouter");

//validate deckId
router.use("/:deckId", validateParams(schemas.idSchema, "deckId"));

router
  .route("/:deckId")
  .get(DeckController.getDeck)
  .put(validateBody(schemas.deckSchema), DeckController.replaceDeck)
  .patch(validateBody(schemas.deckOptionalSchema), DeckController.updateDeck)
  .delete(DeckController.deleteDeck);

//v1/decks
router
  .route("/")
  .get(DeckController.index) // -> get all decks
  .post(validateBody(schemas.deckSchema), DeckController.newDeck); // -> create a new deck

module.exports = router;
