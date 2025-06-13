"use client";

import type { GroupNavigation } from "./types.";
import styles from "./index.module.css";
import { useAppSelector } from "@/app/store/hooks";
import { Apps } from "@/features/AddApp/constants";
import getClassName from "@/shared/lib/getClassName";
import { type MouseEvent, MouseEventHandler, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeGroup, setActive } from "@/app/store/slices/panelManager";

const GroupNavigation: GroupNavigation = ({ hideListApps }) => {

    const dispatch = useDispatch();

    const GroupNavigationRef = useRef<HTMLDivElement>(null);
    const { groups, activeIndex } = useAppSelector(state => state.panel_manager);
    const InnerContainerGroupsRef = useRef<HTMLDivElement>(null);
    const ButtonNumberRef = useRef<number | null>(null);

    const handleMouseUp = (indexGroup: number) => {

        switch (ButtonNumberRef.current) {

            case 1:
                dispatch(setActive({ type: "index", index: indexGroup }));
                break;

            case 2:
                dispatch(removeGroup(indexGroup));
                break;

        }

        hideListApps();

    };
    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        ButtonNumberRef.current = event.buttons;
    };

    useEffect(
        () => {

            if (!InnerContainerGroupsRef.current) return;

            InnerContainerGroupsRef.current.style.transform = `translateX(-${activeIndex * (100 / groups.length)}%)`;

        },
        [activeIndex]
    );

    return (
        <div
            ref={GroupNavigationRef}
            className={styles.group_navigation}
        >
            <div
                ref={InnerContainerGroupsRef}
                className={styles.inner_container_groups}
                style={{
                    width: `${groups.length * 100}%`,
                }}
            >
                {
                    groups.map((group, index) => (
                        <div
                            className={getClassName(styles.group)}
                            onMouseUp={() => handleMouseUp(index)}
                            onMouseDown={handleMouseDown}
                            onContextMenu={(event) => event.preventDefault()}
                            key={`group-${index}`}
                        >
                            {
                                group.map(app_name => (
                                    <img
                                        key={app_name}
                                        src={`/icons/apps/${Apps[app_name as keyof typeof Apps].icon}.svg`}
                                        className={styles.app}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );

};

export default GroupNavigation;