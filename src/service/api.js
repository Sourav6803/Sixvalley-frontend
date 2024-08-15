import axios from "axios";
import { server } from "../server";

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${server}/message/uploadFile`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}


export const newMessages = async (data) => {
    try {
        return await axios.post(`${server}/message/create-new-message`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}