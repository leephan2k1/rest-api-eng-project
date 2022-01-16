const index = (req, res, next) => {
  return res.status(200).json({
    message: "user handler hihi",
  });
};

module.exports = {
  index,
};
