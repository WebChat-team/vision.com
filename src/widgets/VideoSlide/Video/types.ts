import { VideoModes, VideoSlice } from "@/app/store/slices/video/types";
import type { Dispatch, FC, SetStateAction } from "react";

interface Props {
    className: string,
    videoData: VideoSlice | null,
    mode: VideoModes,
    setVideoFile: Dispatch<SetStateAction<File | null>>
}
type Video = FC<Readonly<Props>>

export type { Video };