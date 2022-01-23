const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const User = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    decks: [{ type: Schema.Types.ObjectId, ref: "Deck" }],
  },
  {
    timestamps: true,
  }
);

//password encoded
User.pre("save", async function (next) {
  try {
    //IMPORTANT: arrow function not working with 'this'! use keyword function.
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hashSync(this.password, salt);
    //Store  password hash
    this.password = passwordHashed;
    next();
  } catch (err) {
    next(err);
  }
});
//password verify
User.methods.verifyPassword = async function (reqPassword) {
  try {
    return await bcrypt.compare(reqPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model("User", User);
