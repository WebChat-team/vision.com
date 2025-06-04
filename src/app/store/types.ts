import { makeStore } from ".";

type AppStore = ReturnType<typeof makeStore>
type RootState = ReturnType<AppStore["getState"]>
type AppDispatch = AppStore['dispatch']

export type { AppStore, RootState, AppDispatch };