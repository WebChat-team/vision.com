// imports ================================================= //
import type { DetailedHTMLProps, FC, OptionHTMLAttributes } from "react";

// main ==================================================== //
type Props = {
}
type PropsOption = DetailedHTMLProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
>
type Option = FC<Readonly<PropsOption & Props>>

// exports ================================================= //
export type { PropsOption, Option }