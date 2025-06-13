import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user";
import panelMangerSlice from "./slices/panelManager";
import videoSlice from "./slices/video";
import loadUserData from "./slices/user/loadUserData";
import videoCommentsSlice from "./slices/videoComments";
import accountSlice from "./slices/account";

const rootReducers = combineReducers({
    [UserSlice.name]: UserSlice.reducer,
    [panelMangerSlice.name]: panelMangerSlice.reducer,
    [videoSlice.name]: videoSlice.reducer,
    [videoCommentsSlice.name]: videoCommentsSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
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