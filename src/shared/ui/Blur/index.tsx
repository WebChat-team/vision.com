"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import Animate from "../Animate";
import { hide, show } from "./animations";

export default function Blur({ has }: { has: boolean }) {
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return createPortal(
        <Animate has={has} onShow={show} onHide={hide}>
            <div className={styles.blur}></div>
        </Animate>,
        document.body
    );

}