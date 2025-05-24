"use client"

import styles from "./index.module.css";
import Menu from "@/entities/menu";
import { useRef, useState } from "react";
import { hideMenu, getShowMenu } from "./constants";
import Popup from "@/shared/ui/Popup";

export default function ShowMenu() {

    const showMenuButtonRef = useRef<HTMLButtonElement>(null);
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);

    return (
        <>
            <button
                ref={showMenuButtonRef}
                onClick={() => setIsVisibleMenu(previousValue => !previousValue)} className={styles.show_menu_button}
            >
                <span className='icon-menu'></span>
            </button>
            {
                showMenuButtonRef.current && 
                <Popup
                    has={isVisibleMenu}
                    onShow={getShowMenu(showMenuButtonRef.current!)}
                    onHide={hideMenu}
                >
                    <Menu onClose={() => setIsVisibleMenu(false)} />
                </Popup>
            }
            
        </>
    );

};