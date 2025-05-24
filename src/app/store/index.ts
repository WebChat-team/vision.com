import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user";

const makeStore = () => {
    return configureStore({
        reducer: {
            [UserSlice.name]: UserSlice.reducer
        }
    });
};

export default makeStore;