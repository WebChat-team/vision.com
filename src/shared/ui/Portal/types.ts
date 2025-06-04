// imports ================================================== //
import type { FC, ReactNode } from "react";

// main ==================================================== //
type Props = {
    children: ReactNode | ReactNode[]
}
type Portal = FC<Readonly<Props>>

// exports ================================================= //
export type { Portal }