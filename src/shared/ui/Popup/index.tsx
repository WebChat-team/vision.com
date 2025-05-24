"use client"

import { AnimationJS } from "moveton";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Animate from "../Animate";
import Darkness from "../Darkness";

export default function Popup({ has, onShow, onHide, children }: {
    has: boolean,
    onShow: (element: HTMLElement) => ReturnType<AnimationJS['start']>,
    onHide: (element: HTMLElement) => ReturnType<AnimationJS['start']>,
    children: ReactNode
}) {

    return (
        createPortal(
            <>
                <Darkness has={has} />
                <Animate has={has} onShow={onShow} onHide={onHide}>
                    {children}
                </Animate>
            </>,
            document.body
        )
    );

}