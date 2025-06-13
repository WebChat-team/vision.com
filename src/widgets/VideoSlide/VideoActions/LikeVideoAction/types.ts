// imports ================================================== //
import type { Dispatch, FC, SetStateAction } from "react";

// main ===================================================== //
interface Props {
    id: string
}
type LikeVideoAction = FC<Readonly<Props>>

// exports ================================================== //
export type { LikeVideoAction };