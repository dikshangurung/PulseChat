import { axiosInstance } from ".";

export const GetAllChats = async () => {
	const response = await axiosInstance.get("/api/chats/get-all-chats");
	return response.data;
};

export const CreateNewChat = async (members) => {
	const response = await axiosInstance.post("/api/chats/create-new-chat", {
		members,
	});
	return response.data;
};

export const ClearChatMessages = async (chatId) => {
	const response = await axiosInstance.post(
		"/api/chats/clear-unread-messages",
		{
			chat: chatId,
		}
	);
	return response.data;
};
