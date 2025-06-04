// imports ================================================== //
import type { FC } from "react";

// main ===================================================== //
interface Props {
    close: () => void,
    text: string,
}
type WrongMessage = FC<Readonly<Props>>

// exports ================================================== //
export type { WrongMessage };