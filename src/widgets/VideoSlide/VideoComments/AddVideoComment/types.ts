// imports ================================================== //
import type { Dispatch, FC, ReactNode, SetStateAction } from "react";

// main ===================================================== //
interface Props {
    video_id: string,
    setIsUpdateComments: Dispatch<SetStateAction<boolean>>,
    parent_id?: string
}
type AddVideoComment = FC<Readonly<Props>>

// exports ================================================== //
export type { AddVideoComment };