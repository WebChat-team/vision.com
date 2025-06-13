// imports ================================================= //
import type { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";

// main ==================================================== //
type Props = {
}
type PropsSelect = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>
type Select = FC<Readonly<PropsSelect & Props>>

// exports ================================================= //
export type { Props, PropsSelect, Select }