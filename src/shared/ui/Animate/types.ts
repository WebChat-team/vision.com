// imports =================================================== //
import type { FC, ReactElement } from "react";
import type { AnimationJS } from "moveton"

// main ====================================================== //
interface Props {
    has: boolean,
    onShow?: (element: HTMLElement) => ReturnType<AnimationJS["start"]>,
    onHide?: (element: HTMLElement) => ReturnType<AnimationJS["start"]>,
    children: ReactElement
}
type Animate = FC<Readonly<Props>>

// export ==================================================== //
export type { Props, Animate };