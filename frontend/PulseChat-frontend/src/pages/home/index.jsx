import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatArea from "./components/ChatArea";
import UserSearch from "./components/UserSearch";
import UsersList from "./components/UsersList";
import { io } from "socket.io-client";

function Home() {
	const socket = io("http://localhost:5000");
	const [searchKey, setSearchKey] = React.useState("");
	const { selectedChat, user } = useSelector((state) => state.userReducer);
	const [onlineUsers, setOnlineUsers] = React.useState([]);

	// useEffect(() => {
	// 	socket.emit("send-new-message-to-all", { message: "Hi from diskhan" });

	// 	//Can be used in online multiple users chat application
	// 	socket.on("receive-new-message", (data) => {
	// 		console.log("Message received from server:", data);
	// 	});
	// }, []);
	//Current user has joined the room
	useEffect(() => {
		//join the room with user ID
		if (!user) return;
		socket.emit("join-room", user._id);

		//Testing purpose from Hari to Ram
		socket.emit("send-message", {
			text: "Hello from Hari",
			sender: user._id,
			receiver: "68318efb9fb843582bfd1c39", // Replace with actual receiver ID
		});

		//Receive message from Hari
		socket.on("receive-message", ({ text, sender }) => {
			console.log(`Message from ${sender}: ${text}`);
		});

		socket.on("online-users", (users) => {
			setOnlineUsers(users);
		});

		return () => {
			socket.off("online-users"); // Clean up the event listener
			socket.disconnect();
		};
	}, [user]);

	return (
		<div className="flex gap-5">
			{/* 1st part   user search , userslist/chatlist */}
			<div className="w-96">
				<UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
				<UsersList searchKey={searchKey} onlineUsers={onlineUsers} />
			</div>

			{/* 2nd part   chatbox */}
			{selectedChat && (
				<div className="w-full">
					<ChatArea socket={socket} />
				</div>
			)}

			{!selectedChat && (
				<div className="w-full h-[80vh]  items-center justify-center flex bg-white flex-col">
					<img
						src="https://www.pngmart.com/files/16/Speech-Chat-Icon-Transparent-PNG.png"
						alt=""
						className="w-96 h-96"
					/>
					<h1 className="text-2xl font-semibold text-gray-500">
						Select a user to chat
					</h1>
				</div>
			)}
		</div>
	);
}

export default Home;
