// imports ================================================== //
import type { FC, ReactNode } from 'react';

// main ===================================================== //
type Theme = "light" | "dark"
interface InitailStateContext {
    isLightTheme: boolean,
    setTheme: (newValue: boolean) => void
}
interface Props {
    children: ReactNode | ReactNode[]
}
type AppearanceProvider = FC<Readonly<Props>>

// exports ================================================== //
export type { AppearanceProvider, Theme, InitailStateContext };