const express = require("express");

require("dotenv").config();
const app = express();

const dbConfig = require("./config/dbConfig");

const PORT = process.env.PORT || 5000;

const userRoute = require("./routes/usersRoute");
app.use(express.json());

app.use("/api/users", userRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
