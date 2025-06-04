"use client"

import { useAppSelector } from "@/app/store/hooks";
import styles from "./index.module.css";
import { Apps } from "@/features/AddApp/constants";
import { Fragment, useEffect, useRef } from "react";

const PanelView = () => {

    const { groups, activeIndex } = useAppSelector(state => state.panel_manager);

    const panelViewRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {

            if (!panelViewRef.current) return;

            panelViewRef.current.style.transform = `translateX(-${activeIndex * (100 / groups.length)}%)`;

        },
        [activeIndex]
    );

    return (
        <div
            ref={panelViewRef}
            className={styles.panel_view}
            style={{ width:`${groups.length * 100}%` }}
        >
            {
                groups.map((group, groupIndex) => (
                    <div key={`group-${groupIndex}`} className={styles.group_view}>
                        {group.map((item, itemIndex) => (
                            <Fragment key={`item-${groupIndex}-${itemIndex}`}>
                                {itemIndex !== 0 && <span className={styles.separator}></span>}
                                {Apps[item as keyof typeof Apps].component}
                            </Fragment>
                        ))}
                    </div>
                ))
            }
        </div>
    );

};

export default PanelView;