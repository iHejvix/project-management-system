import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import api from "@/config/api.js";

export const fetchIssueById = createAsyncThunk(
    "issue/fetchIssueById",
    async (issueId) => {
        try {
            //check if data is object or variable
            const response = await api.get(`api/issues/${issueId}`)
            console.log("all issue data", response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
});


export const fetchIssueByProjectId = createAsyncThunk(
    "issue/fetchIssueByProjectId",
    async (projectId) => {
        try {
            //check if data is object or variable
            const response = await api.get(`api/issues/project/${projectId}`)
            console.log("all issue data", response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    });

export const updateIssueStatus = createAsyncThunk(
    "issue/updateIssue",
    async ({issueId, status}) => {
        try {
            //check if data is object or variable
            const response = await api.put(`api/issues/${issueId}/status/${status}`)
            console.log("update issue status", response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    });

export const assigneeUserToIssue = createAsyncThunk(
    "issue/assigneeUser",
    async ({issueId, userId}) => {
        try {
            //check if data is object or variable
            const response = await api.put(`api/issues/${issueId}/assignee/${userId}`)
            console.log("assigned issue ", response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    });

export const deleteIssue = createAsyncThunk(
    "issue/deleteIssue",
    async (issueId) => {
        try {
            //check if data is object or variable
            await api.delete("api/issues/" + issueId);
            console.log("delete issue ", issueId)
            return issueId
        } catch (error) {
            console.log(error)
        }
    });

export const createIssue = createAsyncThunk(
    "issue/createIssue",
    async (issue) => {
        try {
            //check if data is object or variable
            console.log(issue)
            const response = await api.post(`api/issues`, issue)
            console.log("create issue ", response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    });

export const updateIssue = createAsyncThunk(
    "issue/updateIssue",
    async ({issueId, issue}) => {
        try {
            const {data} = await api.patch(`api/issues/${issueId}`, issue)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {
    issues: [],
    error: null,
    status: "idle",
    issueDetails: null
}

export const issueSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchIssueByProjectId.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.issues = action.payload
            })

            .addCase(createIssue.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.issues.push(action.payload)
            })

            .addCase(updateIssue.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.issues = state.issues.map(issue =>
                    issue.id === action.payload.id ? action.payload : issue
                )
            })

            .addCase(assigneeUserToIssue.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.issues = state.issues.map(issueId => issueId === action.payload ? action.payload : issueId)
            })

            .addCase(deleteIssue.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.issues = state.issues.filter(issueId => issueId !== action.payload)
            })

            .addMatcher(isFulfilled(fetchIssueById, updateIssueStatus), (state, action) => {
                state.status = "succeeded"
                state.issueDetails = action.payload
            })

            .addMatcher(action => isPending(action), (state) => {
                state.status = "pending"
            })

            .addMatcher(action => isRejected(action) , (state, action) => {
                state.status = "rejected"
                state.error = action.error.message ?? "Unknown Error"
            })

            .addDefaultCase(state => state)
    }
})

export default issueSlice.reducer
export const selectIssues = (state) => state.issue.issues