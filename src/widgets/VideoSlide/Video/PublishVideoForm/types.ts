// imports ================================================== //
import type { FC, ReactNode } from "react";

// main ===================================================== //
interface Props {
    videoFile: File | null
}
type PublishVideoForm = FC<Readonly<Props>>

// exports ================================================== //
export type { PublishVideoForm };