const User = require("../models/User");

const index = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) next(err);
    return res.status(200).json({
      users,
    });
  });
};

const newUser = (req, res, next) => {
  //create object user
  const newUsr = new User(req.body);
  newUsr.save((err, usr) => {
    if (err) console.err(err);
    console.log("User saved!", usr);
    return res.status(201).json({
      usr,
    });
  });
};

module.exports = {
  index,
  newUser,
};
