"use client"

import { useState } from "react";
import getClassName from "@/shared/lib/getClassName";
import styles from "./index.module.css";
import type { Navigation as NavigationType } from "./types";
import ListApps from "./ListApps";
import GroupNavigation from "./GroupNavigation";

const Navigation: NavigationType = () => {

    const [hasListApps, setListApps] = useState(false);

    function hideListApps() {
        setListApps(false)
    }

    return (
        <div className={styles.navigation}>
            <ListApps has={hasListApps} hideListApps={hideListApps} />
            <button
                className={getClassName(styles.show_list_apps, hasListApps ? styles.active : null)}
                onClick={() => setListApps(isVisible => !isVisible)}
            >
                <img src="/icons/logo.svg" className={styles.logo} />
            </button>
            <GroupNavigation hideListApps={hideListApps} />
        </div>
    );

};

export default Navigation;