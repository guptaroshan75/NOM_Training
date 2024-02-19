import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";

interface UserRegistrationData {
    fname: string,
    lname: string,
    email: string,
    password: string,
    cpassword: string,
    phone: string,
    dob: Date | null,
    divece_token: string,
    allownotification: string,
}

interface UserLoginData {
    password: string;
    email: string;
    device_token: string,
}

export const registerUser = createAsyncThunk("Auth/registerUser",
    async (userObj: UserRegistrationData) => {
        try {
            const response = await axios.post(`${Api}/registration`, userObj);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const loginUser = createAsyncThunk("Auth/loginUser",
    async (userObj: UserLoginData) => {
        try {
            const response = await axios.post(`${Api}/login`, userObj);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        user: null as any,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.user = payload.data;
            })
            .addCase(loginUser.pending, (state, { payload }) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload;
            })
    },
});

export default AuthSlice.reducer;
