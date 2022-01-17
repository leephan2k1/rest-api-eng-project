const User = require("../models/User");
const Deck = require("../models/Deck");

const index = async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};

const newUser = async (req, res, next) => {
  //create object user
  const newUsr = new User(req.body);
  await newUsr.save();
  return res.status(201).json({ newUsr });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById({ _id: userId });
  return res.status(200).json({ user });
};

const replaceUser = async (req, res, next) => {
  const { userId } = req.params;
  const newUser = req.body;
  await User.findByIdAndUpdate(userId, newUser);
  return res.status(200).json({ success: true });
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const newUser = req.body;
  await User.findByIdAndUpdate(userId, newUser);
  return res.status(200).json({ success: true });
};

const getUserDecks = async (req, res, next) => {
  const { userId } = req.params;
  const thisUser = await User.findById(userId).populate('decks');
  const decks = thisUser.decks;

  return res.status(200).json({
    decks,
    success: true
  });

};

const createUserDecks = async (req, res, next) => {
  const { userId } = req.params;
  const newDeck = new Deck(req.body);
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

module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
  getUserDecks,
  createUserDecks,
};
