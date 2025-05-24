"use client"

// imports ================================================== //
import makeStore from "@/app/store";
import type { AppStore } from "@/app/store/types";
import { useRef } from "react";
import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";

// types ==================================================== //
interface Props {
    children: ReactNode
}

// main ===================================================== //
export const StoreProvider: FC<Props> = ({ children }) => {
  
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    );
    
};