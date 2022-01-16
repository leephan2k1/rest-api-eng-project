const User = require("../models/User");

const index = (req, res, next) => {
  User.find({})
    .then((users) => {
      return res.status(200).json({
        users,
      });
    })
    .catch((error) => next(error));
};

const newUser = (req, res, next) => {
  //create object user
  const newUsr = new User(req.body);
  newUsr
    .save()
    .then((usr) => {
      return res.status(200).json({
        usr,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  index,
  newUser,
};
