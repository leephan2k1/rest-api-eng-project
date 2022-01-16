const User = require("../models/User");

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

module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
};
