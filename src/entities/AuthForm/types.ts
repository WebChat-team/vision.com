// imports ================================================== //
import { PropsForm } from "@webchat_com/webchat_ui";
import type { FC, ReactNode } from "react";

// main ==================================================== //
type Props = {
    name: string,
    children: ReactNode | ReactNode[]
}
type AuthForm = FC<Readonly<Props & PropsForm>>

// exports ================================================= //
export type { AuthForm }