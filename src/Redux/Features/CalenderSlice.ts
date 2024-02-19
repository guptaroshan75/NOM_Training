import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface move_date_post {
    real_date: any, change_date: any,
}

interface graph_dates {
    user_date: string,
}

interface monthlyOverView {
    first_date: string,
}

interface update_rating {
    comment: string, Weight: string, Trainings_time_min: string, date: any;
    data: {
        row_id: string; power_watt: any; max_plus: any; average_power: any;
        cadence: any; time_min: any; breaks: any; rating: string;
    }[];
}

interface notification_post {
    trainer_id: string, user_id: string, msg: string, title: string, user_name: string
}

interface Calender {
    isLoading: boolean;
    getalldate_graph: graph_dates | null
    get_date_time: any[];
    notification: any[];
    notificationTrainer: any[]
    move_dates: move_date_post | null;
    notification_postTrainer: notification_post | null;
    monthlyOverView_date: monthlyOverView | null
    edit_rating_excel: update_rating | null
}

const initialState: Calender = {
    isLoading: false,
    getalldate_graph: null,
    get_date_time: [],
    notification: [],
    notificationTrainer: [],
    move_dates: null,
    notification_postTrainer: null,
    monthlyOverView_date: null,
    edit_rating_excel: null
};

export const getalldate_Post = createAsyncThunk("Calender/getalldate_Post",
    async (graph_dates: graph_dates) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/getalldate/${User_id}`, graph_dates);            
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const get_Date_Time = createAsyncThunk("Calender/get_Date_Time", async () => {
    const User_id = await AsyncStorage.getItem('User_id');
    try {
        const response = await axios.get(`${Api}/getdatetime/${User_id}`);
        return response.data;
    } catch (error) {
        return error
    }
});

export const get_notification = createAsyncThunk("Calender/get_notification", async () => {
    const User_id = await AsyncStorage.getItem('User_id');
    try {
        const response = await axios.get(`${Api}/notification_user/${User_id}`);
        return response.data;
    } catch (error) {
        return error
    }
});

export const move_Date = createAsyncThunk("Calender/move_date",
    async (move_date_post: move_date_post) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/move_date/${User_id}`, move_date_post);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const notification_trainer = createAsyncThunk("Calender/notification_trainer",
    async (trainer_Id: any) => {
        try {
            const response = await axios.get(`${Api}/notification_trainer/${trainer_Id}`);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const notification_trainer_post = createAsyncThunk("Calender/notification_trainer_post",
    async ({ notification_post, trainer_Id }: { notification_post: notification_post, trainer_Id: string }) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/get_single_trainer/${User_id}/${trainer_Id}`,
                notification_post);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const monthlyOverViewDate_Post = createAsyncThunk("Calender/monthlyOverViewDate",
    async (monthlyOverView: monthlyOverView) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/monthlyOverViewDate/${User_id}`, monthlyOverView);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const Update_Rating = createAsyncThunk("Calender/update_Rating",
    async (update_rating: update_rating) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/daily_rating_update/${User_id}`, update_rating);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

const CalenderSlice = createSlice({
    name: "Calender",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_Date_Time.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_Date_Time.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_date_time = payload.data;
            })
            .addCase(getalldate_Post.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getalldate_graph = payload.data;
            })
            .addCase(get_notification.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.notification = payload.data;
            })
            .addCase(move_Date.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.move_dates = payload.data;
            })
            .addCase(notification_trainer.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.notificationTrainer = payload.data;
            })
            .addCase(notification_trainer_post.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.notification_postTrainer = payload.data;
            })
            .addCase(monthlyOverViewDate_Post.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.monthlyOverView_date = payload.data;
            })
            .addCase(Update_Rating.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.edit_rating_excel = payload.data;
            })
    },
});

export default CalenderSlice.reducer;
