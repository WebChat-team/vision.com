// imports ================================================== //
import { VideoModes } from "@/app/store/slices/video/types";
import type { Dispatch, FC, SetStateAction } from "react";

// main ===================================================== //
interface Props {
    mode: VideoModes,
    setVideoFile: Dispatch<SetStateAction<File | null>>
}
type SelectVideoForView = FC<Readonly<Props>>

// exports ================================================== //
export type { SelectVideoForView };