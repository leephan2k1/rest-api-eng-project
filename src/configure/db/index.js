const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydata");
    console.log("connect success!");
  } catch (e) {
    console.log("connect failed: " + e.message);
  }
}

module.exports = { connect };
