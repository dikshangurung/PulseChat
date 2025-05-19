import { axiosInstance } from ".";

export const SendMessage = async (message) => {
	const response = await axiosInstance.post(
		"/api/messages/new-message",
		message
	);
	return response.data;
};

export const GetMessages = async (chatId) => {
	const response = await axiosInstance.get(
		`/api/messages/get-all-messages/${chatId}`
	);
	return response.data;
};
