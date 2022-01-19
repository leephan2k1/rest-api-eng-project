const User = require("../models/User");
const Deck = require("../models/Deck");

const index = async (req, res, next) => {
  const decks = await Deck.find({});
  return res.status(200).json({ decks });
};

const newDeck = async (req, res, next) => {
  const owner = await User.findById(req.body.owner);
  if (!owner) {
    return res.status(400).json({
      message: "not found user",
    });
  }

  const newDeck = new Deck(req.body);
  await newDeck.save();
  owner.decks.push(newDeck._id);
  await owner.save();

  res.status(201).json({
    newDeck,
    message: "success",
  });
};

module.exports = { index, newDeck };
