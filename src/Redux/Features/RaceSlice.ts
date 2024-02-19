import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface add_new_race {
    name: string, goal: string, priority: string,
    first_day: string, last_day: string,
    distance: string, vertical_meters: string,
    arrival: string, departure: string,
}

interface update_single_race {
    name: string, goal: string, priority: string,
    first_day: string, last_day: string,
    distance: string, vertical_meters: string,
    arrival: string, departure: string,
}

interface Race {
    isLoading: boolean;
    add_race: add_new_race | null;
    get_all_Race: any[];
    get_single_Race: {
        arrival: string, departure: string, id: string
        distance: string, first_day: string, goal: string, last_day: string,
        name: string, priority: string, vertical_meters: string
    };
    update_race: update_single_race | null;
}

const initialState: Race = {
    isLoading: false,
    add_race: null,
    get_all_Race: [],
    get_single_Race: {
        arrival: '', departure: '', distance: '', first_day: '', goal: '', last_day: '',
        name: '', priority: '', vertical_meters: '', id: ''
    },
    update_race: null,
};

export const add_race = createAsyncThunk("Race/add_race",
    async (add_new_race: add_new_race) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/add_race/${User_id}`, add_new_race);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const get_All_Race = createAsyncThunk("Race/show_race", async () => {
    const User_id = await AsyncStorage.getItem('User_id');
    try {
        const response = await axios.get(`${Api}/show_race/${User_id}`);
        return response.data;
    } catch (error) {
        return error
    }
}
);

export const get_Single_Race = createAsyncThunk("Race/editrace", async (race_id: number) => {
    const User_id = await AsyncStorage.getItem('User_id');
    try {
        const response = await axios.get(`${Api}/editrace/${race_id}/${User_id}`);
        return response.data;
    } catch (error) {
        return error
    }
}
);

export const update_race = createAsyncThunk("Race/update_race",
    async ({ update_single_race, race_id }: { update_single_race: update_single_race, race_id: string }) => {
        const User_id = await AsyncStorage.getItem('User_id');
        try {
            const response = await axios.post(`${Api}/race_update/${race_id}/${User_id}`,
                update_single_race);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const deleteRace = createAsyncThunk("race_delete", async (race_id: number) => {
    const User_id = await AsyncStorage.getItem('User_id');
    try {
        const response = await axios.delete(`${Api}/race_delete/${race_id}/${User_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const RaceSlice = createSlice({
    name: "race",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(add_race.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(add_race.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.add_race = payload.data;
            })
            .addCase(get_All_Race.pending, (state, { payload }) => {
                state.isLoading = true;
            })
            .addCase(get_All_Race.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_all_Race = payload.data;
            })
            .addCase(get_Single_Race.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_single_Race = payload.data;
            })
            .addCase(update_race.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.update_race = payload.data;
            })
            .addCase(deleteRace.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_all_Race = state.get_all_Race.filter(all_race => all_race.id !== payload);
            })
    },
});

export default RaceSlice.reducer;
