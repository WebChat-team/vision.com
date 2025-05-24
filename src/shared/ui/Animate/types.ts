// imports =================================================== //
import type { FC, ReactNode } from "react";
import type { AnimationJS } from "moveton"

// main ====================================================== //
interface Props {
    has: boolean,
    onShow?: (element: HTMLElement) => ReturnType<AnimationJS["start"]>,
    onHide?: (element: HTMLElement) => ReturnType<AnimationJS["start"]>
}
type Animate = FC<
    Props &
    { children: ReactNode }
>

// export ==================================================== //
export type { Animate, Props };