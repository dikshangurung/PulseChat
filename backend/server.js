const express = require("express");

require("dotenv").config();
const app = express();

const dbConfig = require("./config/dbConfig");

const PORT = process.env.PORT || 5000;

const userRoute = require("./routes/usersRoute");
const chatsRoute = require("./routes/chatsRoute");
const messageRoute = require("./routes/messagesRoute");
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messageRoute);
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
