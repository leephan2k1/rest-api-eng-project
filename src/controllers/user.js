const User = require("../models/User");
const Deck = require("../models/Deck");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configure/jwt");

const index = async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};

const newUser = async (req, res, next) => {
  //create object user
  const newUsr = new User(req.verified.body);
  await newUsr.save();
  return res.status(201).json({ newUsr });
};

const getUser = async (req, res, next) => {
  const { userId } = req.verified.params;
  const user = await User.findById({ _id: userId });
  return res.status(200).json({ user });
};

const replaceUser = async (req, res, next) => {
  const { userId } = req.verified.params;
  const newUser = req.verified.body;
  await User.findByIdAndUpdate(userId, newUser);
  return res.status(200).json({ success: true });
};

const updateUser = async (req, res, next) => {
  const { userId } = req.verified.params;
  const newUser = req.verified.body;
  await User.findByIdAndUpdate(userId, newUser);
  return res.status(200).json({ success: true });
};

const getUserDecks = async (req, res, next) => {
  const { userId } = req.verified.params;
  const thisUser = await User.findById(userId).populate("decks");
  const decks = thisUser.decks;

  return res.status(200).json({
    decks,
    success: true,
  });
};

const createUserDecks = async (req, res, next) => {
  const { userId } = req.verified.params;
  const newDeck = new Deck(req.verified.body);
  const thisUser = await User.findById(userId);

  newDeck.owner = thisUser._id;
  await newDeck.save();
  //add new deck to user decks
  // -> if .push(newDeck) => warning message: maximum call stack...
  thisUser.decks.push(newDeck._id);
  await thisUser.save();

  return res.status(201).json({
    deck: newDeck,
    success: true,
  });
};

const secret = async (req, res, next) => {
  res.json({
    resource: true,
  });
};

const encodedToken = (userId) => {
  return jwt.sign(
    {
      iss: "admin",
      sub: userId,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3), //3 days
    },
    JWT_SECRET
  );
};

const signIn = async (req, res, next) => {
  const token = encodedToken(req.user._id);

  res.setHeader("Authorization", token);
  res.status(200).json({
    success: true,
  });
};

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.verified.body;

  //check exist user email
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return res
      .status(401)
      .json({ success: false, message: "email is already registered" });
  }
  const newUser = new User({ firstName, lastName, email, password });
  await newUser.save();

  const token = encodedToken(newUser._id);

  res.setHeader("Authorization", token);
  res.status(201).json({
    success: true,
  });
};

module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
  getUserDecks,
  createUserDecks,
  signIn,
  signUp,
  secret,
};
