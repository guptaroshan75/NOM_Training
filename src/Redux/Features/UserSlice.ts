import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface user_update {
    fname: string, lname: string, email: string,
    phone: string, dob: string,
}

interface change_password {
    email: string, old_password: string,
    new_password: string, confrim_password: string,
}

interface User_Profile {
    sendimage: string
}

interface Race {
    isLoading: boolean;
    user_profile_update: user_update | null;
    user_change_password: change_password | null;
    profile_image_url: User_Profile | null;
    get_user: any[];
}

const initialState: Race = {
    isLoading: false,
    user_profile_update: null,
    user_change_password:  null,
    profile_image_url: null,
    get_user: [],
};

export const User_Update = createAsyncThunk("Race/User_Update",
    async (user_update: user_update) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.put(`${Api}/user_update/${User_id}`, user_update);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const User_Profile_Image = createAsyncThunk("Race/profile_file",
    async (formData: FormData) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/profile_file/${User_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const get_User = createAsyncThunk("User/users", async () => {
    const User_id = await AsyncStorage.getItem('User_id');
    try {
        const response = await axios.get(`${Api}/users/${User_id}`);
        return response.data;
    } catch (error) {
        return error
    }
});

export const Change_Password = createAsyncThunk("Race/Change_Password",
    async (change_password: change_password) => {
        try {
            const response = await axios.put(`${Api}/change_password`, change_password);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(User_Update.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(User_Update.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.user_profile_update = payload.data;
            })
            .addCase(User_Profile_Image.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.profile_image_url = payload.data;
            })
            .addCase(get_User.pending, (state, { payload }) => {
                state.isLoading = true;
            })
            .addCase(get_User.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_user = payload.data;
            })
            .addCase(Change_Password.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.user_change_password = payload.data;
            })
    },
});

export default UserSlice.reducer;
