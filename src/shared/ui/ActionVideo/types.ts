// imports ================================================== //
import { PropsButton } from "@/shared/types/propsHtmlElements";
import type { FC, ReactNode } from "react";

// main ===================================================== //
interface Props {
    icon: string,
}
type ActionVideo = FC<Readonly<Props & PropsButton>>

// exports ================================================== //
export type { ActionVideo };