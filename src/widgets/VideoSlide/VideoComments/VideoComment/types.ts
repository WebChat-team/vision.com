// imports ================================================== //
import type { VideoComment as VideoCommentType } from "@/app/store/slices/videoComments/types";
import type { Dispatch, FC, SetStateAction } from "react";

// main ===================================================== //
type VideoComment = FC<Readonly<VideoCommentType & { setIsUpdateComments: Dispatch<SetStateAction<boolean>>}>>

// exports ================================================== //
export type { VideoComment };