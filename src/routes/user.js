const express = require("express");
var router = require("express-promise-router")();
const UserController = require("../controllers/user");
const { validateParams, schemas } = require("../helper/validateRouter");

//Validator for userId
router.use("/:userId", validateParams(schemas.idSchema, "userId"));

//v1/users/:userId
router
  .route("/:userId")
  .get(UserController.getUser) // -> get a user
  .put(UserController.replaceUser) // -> replace a user (new user)
  .patch(UserController.updateUser); // -> update a user (modified field in user)

//v1/users/:userId/decks
router
  .route("/:userId/decks")
  .get(UserController.getUserDecks) // ->
  .post(UserController.createUserDecks); // ->

//v1/users
router
  .route("/")
  .get(UserController.index) // -> get all users
  .post(UserController.newUser); // -> create a new user

module.exports = router;
