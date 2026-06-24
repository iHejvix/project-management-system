import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice.js";
import projectReducer from "@/redux/projectSlice.js";
import chatReducer from "@/redux/chatSlice.js";
import commentReducer from "@/redux/commentSlice.js";
import issueReducer from "@/redux/issueSlice.js";
import subscriptionReducer from "@/redux/subscriptionSlice.js";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        chat: chatReducer,
        comment: commentReducer,
        issue: issueReducer,
        subscription: subscriptionReducer
    },
});
