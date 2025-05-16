const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("connected", () => console.log("Connected to MongoDB"));

module.exports = db;
