const express = require("express");
const router = require("express-promise-router")();
const UserController = require("../controllers/user");
const {
  validateBody,
  validateParams,
  schemas,
} = require("../helper/validateRouter");
const passport = require("passport");
require("../middlewares/passport");

// Validator for userId
router.use("/:userId", validateParams(schemas.idSchema, "userId"));

// v1/users/SignIn
router
  .route("/signin")
  .post(
    validateBody(schemas.signInSchema),
    passport.authenticate("local", { session: false }),
    UserController.signIn
  );

// v1/users/SignUp
router
  .route("/signup")
  .post(validateBody(schemas.signUpSchema), UserController.signUp);

// v1/users/secret
router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), UserController.secret);

//v1/users/:userId
router
  .route("/:userId")
  .get(UserController.getUser) // -> get a user
  .put(validateBody(schemas.userSchema), UserController.replaceUser) // -> replace a user (new user)
  .patch(validateBody(schemas.userOptionalSchema), UserController.updateUser); // -> update a user (modified field in user)

//v1/users/:userId/decks
router
  .route("/:userId/decks")
  .get(UserController.getUserDecks) // ->
  .post(validateBody(schemas.deckSchema), UserController.createUserDecks); // ->

//v1/users
router
  .route("/")
  .get(UserController.index) // -> get all users
  .post(validateBody(schemas.userSchema), UserController.newUser); // -> create a new user

module.exports = router;
