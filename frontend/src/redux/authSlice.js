import {createAsyncThunk, createSlice, isPending, isRejected} from "@reduxjs/toolkit";
import {API_BASE_URL} from "@/config/api.js";
import axios from 'axios';

export const register = createAsyncThunk(
    `/user/register`,
    async (user, {rejectWithValue}) => {
        try {
            console.log("register user", user)
            const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, user)
            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
            }
            console.log("register successfully ", data)
            return data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
)

export const login = createAsyncThunk(
    `/user/login`,
    async (user, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(`${API_BASE_URL}/auth/signing`, user)

            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
            }
            console.log("login successfully ", data)
            console.log("jwt ", data.jwt)
            return data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
)

export const getUser = createAsyncThunk(
    `/api/users`,
    async (user, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                }
            })
            console.log("get user successfully ", data)
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error);
        }
    }
)

export const logout = createAsyncThunk(
    `/auth/logout`,
    async () => {
        localStorage.clear();
    }
)

const initialState = {
    user: null,
    status: null,
    error: null,
    jwt: null,
    projectSize: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jwt = action.payload.jwt;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jwt = action.payload.jwt;
            })

            .addCase(logout.fulfilled, () => ({
                ...initialState
            }))

            .addMatcher(
                isPending(register, login, getUser, logout), (state) => {
                    state.status = "pending";
                }
            )

            .addMatcher(isRejected(register, login, getUser, logout), (state, action) => {
                state.status = "rejected";
                state.error = action.error.message ?? "Unknown error";
            });
    }
});

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user
