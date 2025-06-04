"use client";

import type { App as AppType } from "./types";
import styles from "./index.module.css";
import { MouseEventHandler, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addPanel, setActive, removePanel } from "@/app/store/slices/panelManager";
import { Apps } from "@/features/AddApp/constants";
import getClassName from "@/shared/lib/getClassName";

const App: AppType = ({ type, hideListApps }) => {

    const { includes, activeIndex, groups } = useAppSelector(state => state.panel_manager);
    const dispatch = useAppDispatch();
    const { name, icon } = Apps[type];
    const ButtonNumberRef = useRef<number | null>(null);

    const handleMouseUp: MouseEventHandler<HTMLButtonElement> = (event) => {

        event.preventDefault();

        switch (ButtonNumberRef.current) {

            case 1:
                if (type in includes) {
                    dispatch(setActive(includes[type]));
                    hideListApps();
                } else {
                    dispatch(addPanel({ panelName: type }));
                    hideListApps();
                }
                break;

            case 2:
                dispatch(removePanel(type));
                break;

        }

    };
    const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        ButtonNumberRef.current = event.buttons;
    };

    return (
        <button
            className={getClassName(styles.app, type in includes ? undefined : styles.active)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onContextMenu={(event) => event.preventDefault()}
        >
            <img src={`/icons/apps/${icon}.svg`} className={styles.icon_app} />
            <span className={styles.name_app}>
                {name}
            </span>
        </button>
    );

};

export default App;