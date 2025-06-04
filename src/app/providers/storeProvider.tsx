"use client";

// imports ================================================== //
import { useRef, type FC, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, getPreloadedState } from "../store";
import type { AppStore } from "../store/types";

// types ==================================================== //
interface Props {
    serverState: Awaited<ReturnType<typeof getPreloadedState>>
    children: ReactNode
}

// main ===================================================== //
export const StoreProvider: FC<Props> = ({ serverState, children }) => {

    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore(serverState);
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    );
    
};