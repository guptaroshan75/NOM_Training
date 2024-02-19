import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Features/AuthSlice";
import RaceSlice from "./Features/RaceSlice";
import UserSlice from "./Features/UserSlice";
import CalenderSlice from "./Features/CalenderSlice";
import TrainerSlice from "./Features/TrainerSlice";

const Store = configureStore({
    reducer: {
        authUser: AuthSlice,
        race: RaceSlice,
        user: UserSlice,
        calender: CalenderSlice,
        trainer: TrainerSlice
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;