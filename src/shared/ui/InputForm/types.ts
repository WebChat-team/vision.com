// imports ================================================== //
import { PropsInput } from "@webchat_com/webchat_ui";
import type { FC, ReactNode } from "react";

// main ===================================================== //
interface Props {
    description: string,
    isClear?: boolean,
    children?: ReactNode | ReactNode[]
}
type InputForm = FC<Readonly<PropsInput & Props>>

// exports ================================================== //
export type { InputForm };