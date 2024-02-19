import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";

interface AllTrainer {
    isLoading: boolean;
    all_trainer: any[],
}

const initialState: AllTrainer = {
    isLoading: false,
    all_trainer: [],
};

export const allTrainer_Get = createAsyncThunk("Auth/allTrainer", async () => {
    try {
        const response = await axios.get(`${Api}/alltrainer`);
        return response.data;
    } catch (error) {
        return error
    }
});

const TrainerSlice = createSlice({
    name: "AllTrainer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allTrainer_Get.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allTrainer_Get.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.all_trainer = payload.data;
            })
    },
});

export default TrainerSlice.reducer;
