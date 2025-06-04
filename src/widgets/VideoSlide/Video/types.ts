import type { VideoSlice } from "@/app/store/slices/video/types";
import type { FC } from "react";

type Video = FC<Readonly<VideoSlice>>

export type { Video };