import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "@/config/api.js";

export const createComment = createAsyncThunk(
    "comment/createComment",
    async (comment) => {
        try {
            const response = await api.post("api/comments", comment)
            console.log("comment response", response.data)
            return response.data

        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (commentId) => {
        try {
            await api.delete(`api/comments/${commentId}`)
            console.log("delete comment ", commentId)

        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchComments = createAsyncThunk(
    "comment/fetchComments",
    async (issueId) => {
        try {
            const response = await api.get(`api/comments/${issueId}`)
            console.log("fetch comments ", response.data)
            return response.data

        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {
    comments: [],
    status: "idle",
    error: null,
}

export const commentsSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: builder =>  {
        builder
            .addCase(createComment.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.comments.push(action.payload)
            })

            .addCase(deleteComment.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.comments = state.comments.filter((comment) => comment.id !== action.payload)
            })

            .addCase(fetchComments.fulfilled, (state,action) => {
                state.status = "succeeded"
                state.comments = action.payload
            } )

            .addMatcher(action => action.type.endsWith("pending"), state => {
                state.status = "pending"
            })

            .addMatcher(action => action.type.endsWith("rejected"), state => {
                state.status = "rejected"
                state.error = "Unknown Error"
            })

            .addDefaultCase(state => state)
    },
})
export default commentsSlice.reducer