import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";

interface chat_message_data {
    to_user_id: string, from_user_id: string, chat_message: string,
}

interface Race {
    isLoading: boolean;
    chat_Message: chat_message_data | null;
}

const initialState: Race = {
    isLoading: false,
    chat_Message: null,
};

export const Send_Chat_Post = createAsyncThunk("Race/User_Update",
    async (chat_message_data: chat_message_data) => {
        try {
            const response = await axios.post(`${Api}/chat`, chat_message_data);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

const ChatSlice = createSlice({
    name: "Chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Send_Chat_Post.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(Send_Chat_Post.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.chat_Message = payload.data;
            })
    },
});

export default ChatSlice.reducer;
