"use client";

// imports =================================================== //
import styles from './index.module.css';
import type { AppearanceProvider, InitailStateContext } from './types';
import { createContext, useLayoutEffect, useState } from 'react';

// main ====================================================== //
const AppearanceProviderContext = createContext<InitailStateContext>({
    isLightTheme: false,
    setTheme() {}
});
const AppearanceProvider: AppearanceProvider = ({ children }) => {

    const [isLightTheme, setIsLightTheme] = useState(false);

    const setTheme = (isLight: boolean) => setIsLightTheme(isLight);

    useLayoutEffect(
        () => {

            if (window) {

                const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

                setIsLightTheme(mediaQuery.matches);

                const handleChangeMediaQuery = (event: MediaQueryListEvent) => setIsLightTheme(event.matches);

                mediaQuery.addEventListener("change", handleChangeMediaQuery);

                return () => mediaQuery.removeEventListener("change", handleChangeMediaQuery);

            }

        }, []
    );

    return (
        <div className={styles[isLightTheme ? "light" : "dark"]}>
            <AppearanceProviderContext.Provider value={{ isLightTheme, setTheme }}>
                { children }
            </AppearanceProviderContext.Provider>
        </div>
    );

}

// exports ================================================== //
export { AppearanceProviderContext };
export default AppearanceProvider;