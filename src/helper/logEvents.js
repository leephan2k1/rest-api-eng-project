const fs = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");

const fileName = path.join(__dirname, "../logs", "server.log");
const logEvents = async (msg) => {
  const dateTimes = `${format(new Date(), "dd-MM-YYY\tHH:mm:ss")}`;
  const contenLog = `${dateTimes} --- ${msg}\n`;

  try {
    fs.appendFile(fileName, contenLog);
  } catch (e) {
    console.error(e);
  }
};

module.exports = logEvents;
