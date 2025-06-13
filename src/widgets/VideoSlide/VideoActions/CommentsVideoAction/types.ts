// imports ================================================== //
import type { Dispatch, FC, ReactNode, SetStateAction } from "react";

// main ===================================================== //
interface Props {
    hasComments: boolean,
    setHasComments: Dispatch<SetStateAction<boolean>>,
    video_id: string
}
type CommentsVideoAction = FC<Readonly<Props>>

// exports ================================================== //
export type { CommentsVideoAction };