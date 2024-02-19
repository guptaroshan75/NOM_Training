import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface document_cat {
    name: string,
}

interface Document {
    isLoading: boolean;
    doc_cat: document_cat | null;
}

const initialState: Document = {
    isLoading: false,
    doc_cat: null,
};

export const Document_Post = createAsyncThunk("Document", async (document_cat: document_cat) => {
    const User_id = await AsyncStorage.getItem('User_id');
    try {
        const response = await axios.post(`${Api}/get_all_files/${User_id}`, document_cat);
        return response.data;
    } catch (error) {
        return error
    }
});

const DocumentSlice = createSlice({
    name: "Document",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Document_Post.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(Document_Post.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.doc_cat = payload.data;
            })
    },
});

export default DocumentSlice.reducer;
