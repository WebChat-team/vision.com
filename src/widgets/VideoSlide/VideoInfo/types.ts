import type { VideoSlice } from "@/app/store/slices/video/types";
import type { FC } from "react";

type VideoInfo = FC<Readonly<VideoSlice>>

export type { VideoInfo };