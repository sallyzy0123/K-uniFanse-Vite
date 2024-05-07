import axios from 'axios';
import { socket_url } from "../variables/variables";

const doFetch = axios.create({
    baseURL: socket_url,
})

doFetch.interceptors.request.use(
    async (config) => {
      const token = await localStorage.getItem("userToken");
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
);

const useChat = () => {
    const createChatRoom = async (firstId: string, secondId: string) => {
        try {
            const response = await doFetch.post("/chats", { firstId, secondId });
            return response.data;
        } catch (error) {
            console.error("createChatRoom error: ", error);
        };
    };

    const getChatRoomById = async (chatId: string) => {
        try {
            const response = await doFetch(`/chats/find/${chatId}`);
            return response.data[0];
        }  catch (error) {
            console.error("getChatRoomById error: ", error);
        }
    };

    return { createChatRoom, getChatRoomById };
};

const useMessage = () => {
    const getMessagesByChatId = async (chatId: string) => {
        try {
            const response = await doFetch<Message>(`/messages/${chatId}`);
            return response.data;
        } catch (error) {
            console.error("getMessages error: ", error);
        };
    };

    return { getMessagesByChatId };
};

export { useChat, useMessage };