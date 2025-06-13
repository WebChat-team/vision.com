// imports ================================================== //
import type { FC, ReactNode } from "react";
import type { PropsSelect } from "./components/Select/types";
import { Option } from "./components/Option/types";

// main ===================================================== //
interface Props {
    description: string,
    children: ReactNode
}
type SelectForm = FC<Readonly<PropsSelect & Props>>

// exports ================================================== //
export type { SelectForm };