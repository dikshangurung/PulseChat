const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173", // React Vite app URL
		methods: ["GET", "POST"],
	},
});

//check the connection of socket from client side
// io.on("connection", (socket) => {
// 	console.log("New client connected");
// 	socket.on("send-new-message-to-all", (data) => {
// 		console.log("Message received from client:", data);
// 		// Emit the message to all connected clients
// 		io.emit("receive-new-message", data);
// 	});
// 	socket.on("disconnect", () => {
// 		console.log("Client disconnected");
// 	});
// });

io.on("connection", (socket) => {
	// console.log("New client connected");

	// Join a room based on user ID
	socket.on("join-room", (userId) => {
		socket.join(userId);
		console.log(`User ${userId} joined the room`);
	});
	//Send message to receiver
	socket.on("send-message", ({ text, sender, receiver }) => {
		console.log(`Message from ${sender} to ${receiver}: ${text}`);
		// Emit the message to the specific receiver
		io.to(receiver).emit("receive-message", { text, sender });
	});
	// // Handle online users
	// socket.on("online-users", (users) => {
	// 	io.emit("online-users", users);
	// });

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const dbConfig = require("./config/dbConfig");

const PORT = process.env.PORT || 5000;

const userRoute = require("./routes/usersRoute");
const chatsRoute = require("./routes/chatsRoute");
const messageRoute = require("./routes/messagesRoute");
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messageRoute);
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
