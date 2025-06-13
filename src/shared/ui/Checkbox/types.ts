// imports ================================================== //
import type { PropsInput } from "@webchat_com/webchat_ui";
import type { FC } from "react";

// main ===================================================== //
interface Props {
    title: string,
    description: string,
}
type Checkbox = FC<Readonly<PropsInput & Props>>

// exports ================================================== //
export type { Checkbox };