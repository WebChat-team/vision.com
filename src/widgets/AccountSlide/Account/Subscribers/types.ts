// imports ================================================== //
import type { FC, ReactNode } from "react";

// main ===================================================== //
interface Props {
    user_id: string
}
type Subscribers = FC<Readonly<Props>>

// exports ================================================== //
export type { Subscribers };