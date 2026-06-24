import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "@/config/api.js";

export const sendMessage = createAsyncThunk(
    "message/send",
    async (message) => {
        try {
            const response = await api.post("api/messages/send", message)
            console.log("send message ", response.data)
            return response.data
        } catch(error) {
            console.log("error " + error);
        }
    }
)

export const fetchChatByProjectId = createAsyncThunk(
    "message/getChatByProjectId",
    async (projectId) => {
        try {
            const response = await api.get(`api/projects/${projectId}/chat`);
            console.log("get messages ", response.data)
            return response.data
        } catch(error) {
            console.log("error " + error);
        }
    }
)

export const fetchChatMessages = createAsyncThunk(
    "message/getMessagesById",
    async (projectId) => {
        try {
            const response = await api.get(`api/messages/chat/${projectId}`);
            console.log("get messages ", response.data)
            return response.data
        } catch(error) {
            console.log("error " + error);
        }
    }
)


const initialState = {
    messages: [],
    status: "idle",
    error: null,
    chat: null
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.messages.push(action.payload)
            })

            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.messages = action.payload
            })

            .addCase(fetchChatByProjectId.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.chat = action.payload
            })

            .addMatcher(action => action.type.endsWith("rejected"),
                (state, action) => {
                    state.status = "rejected"
                    state.error = action.error.message ?? 'Unknown Error'
                })

            .addMatcher(action => action.type.endsWith("pending"),
                (state) => {
                    state.status = "pending"
                })
            .addDefaultCase(state => state)
    }
})

export default chatSlice.reducer