"use client";

import { useEffect, useCallback, cloneElement, useRef, useState } from "react";
import type { Animate } from "./types";

const Animate: Animate =({ has, onShow, onHide, children }) => {

        const childRef = useRef<HTMLElement | null>(null);
        const [isMount, setIsMount] = useState(false);

        useEffect(() => {
            
            if (!childRef.current) return;

            if (has) {
                onShow?.(childRef.current);
            } else {
                onHide?.(childRef.current);
            }

        }, [has]);

        useEffect(() => { setIsMount(true); }, []);

        if (!isMount) return null;

        return cloneElement(children, {
            ref: (node: HTMLElement) => {
                childRef.current = node;
            }
        });

};

export default Animate;