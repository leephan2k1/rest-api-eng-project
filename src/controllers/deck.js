const User = require("../models/User");
const Deck = require("../models/Deck");

const index = async (req, res, next) => {
  const decks = await Deck.find({});
  return res.status(200).json({ decks });
};

const newDeck = async (req, res, next) => {
  const owner = await User.findById(req.verified.body.owner);
  if (!owner) {
    return res.status(400).json({
      message: "not found user",
    });
  }

  const newDeck = new Deck(req.verified.body);
  await newDeck.save();
  owner.decks.push(newDeck._id);
  await owner.save();

  res.status(201).json({
    newDeck,
    message: "success",
  });
};

const getDeck = async (req, res, next) => {
  const { deckId } = req.verified.params;
  const deck = await Deck.findById(deckId);

  if (!deck) {
    return res.status(400).json({
      message: "Deck not found",
    });
  }

  return res.status(200).json({ deck });
};

const replaceDeck = async (req, res, next) => {
  const { deckId } = req.verified.params;
  const newDeck = req.verified.body;
  const ownerId = newDeck.owner;
  const owner = await User.findById(ownerId);
  const oldDeck = await Deck.findById(deckId);
  const oldOwner = oldDeck.owner;

  if (!owner) {
    return res.status(400).json({
      message: "Owner not found",
    });
  } else {
    //Kiểm tra owner mới và owner cũ, khác => xoá id deck cũ
    if (owner !== oldOwner) {
      const oldUser = await User.findById(oldOwner);
      oldUser.decks = oldUser.decks.filter((e) => e.toString() !== deckId);
      await oldUser.save();
    }
  }

  //Nếu chưa có trong owner thì thêm vào.
  if (owner.decks.indexOf(deckId) === -1) {
    owner.decks.push(deckId);
    await owner.save();
  }

  const result = await Deck.findByIdAndUpdate(deckId, newDeck);
  return res.status(200).json({
    success: true,
  });
};

const updateDeck = async (req, res, next) => {
  const { deckId } = req.verified.params;
  const newDeck = req.verified.body;

  //Nếu patch có filed owner
  if (newDeck.owner) {
    const ownerId = newDeck.owner;
    const newUser = await User.findById(ownerId);
    const oldDeck = await Deck.findById(deckId);
    const oldOwner = oldDeck.owner;
    //Nếu chưa có trong owner thì thêm vào.
    if (newUser.decks.indexOf(deckId) === -1) {
      newUser.decks.push(deckId);
      await newUser.save();
    }
    //Nếu owner mới và owner cũ khác nhau => xoá deck id owner cũ.
    if (oldOwner !== ownerId) {
      const oldUser = await User.findById(oldOwner);
      oldUser.decks = oldUser.decks.filter((e) => e.toString() !== deckId);
      await oldUser.save();
    }
  }

  const result = await Deck.findByIdAndUpdate(deckId, newDeck);
  return res.status(200).json({
    success: true,
  });
};

const deleteDeck = async (req, res, next) => {
  const { deckId } = req.verified.params;
  const deck = await Deck.findById(deckId);
  const user = await User.findById(deck.owner);
  await deck.remove();
  // user.decks = user.decks.filter((e) => e.toString() !== deckId);
  user.decks.pull(deck);
  await user.save();

  res.status(200).json({ message: "delete success" });
};

module.exports = {
  index,
  newDeck,
  getDeck,
  replaceDeck,
  updateDeck,
  deleteDeck,
};
