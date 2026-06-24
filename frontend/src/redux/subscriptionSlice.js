import api from "@/config/api.js";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";

export const getUserSubscription = createAsyncThunk(
    "subscription/getUserSubscription",
    async ({jwt}) => {
        const response =  await api.get("api/subscription/user", {
            headers: `Authorization Bearer ${jwt}`,
        });
        console.log("user subscription", response.data);
    })

export const updateSubscription = createAsyncThunk(
    "subscription/updateSubscription",
    async ({planType}) => {
        try {
            const response =  await api.patch("api/subscription/upgrade", planType );
            console.log("upgraded subscription", response.data);
        } catch (error) {
            console.log(error)
        }
    })


const initialState = {
    userSubscription: [],
    status: "idle",
    error: null,
}

export const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isFulfilled(updateSubscription, getUserSubscription), (state, action) => {
                state.status = "succeeded"
                state.userSubscription = action.payload
            })

            .addMatcher(isRejected(getUserSubscription, updateSubscription),
                (state, action) => {
                state.status = "rejected"
                state.payload = action.payload
            })

            .addMatcher(isPending(getUserSubscription, updateSubscription), state =>
                state.status = "pending"
            )

            .addDefaultCase(state => state)
    }
})

export default subscriptionSlice.reducer