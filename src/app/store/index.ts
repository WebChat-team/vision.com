import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user";
import panelMangerSlice from "./slices/panelManager";
import videoSlice from "./slices/video";
import loadUserData from "./slices/user/loadUserData";

const rootReducers = combineReducers({
    [UserSlice.name]: UserSlice.reducer,
    [panelMangerSlice.name]: panelMangerSlice.reducer,
    [videoSlice.name]: videoSlice.reducer,
});

function makeStore(preloadedState?: ReturnType<typeof rootReducers>) {
    return configureStore({
        preloadedState,
        reducer: rootReducers
    });
};

const getPreloadedState = async () => {

    const serverStore = makeStore();

    await loadUserData(serverStore);

    return serverStore.getState();

};

export { makeStore, getPreloadedState };