"use client"

import Link from "next/link";
import styles from "./index.module.css";
import { LinkToLogin, LinkToUserStudio } from "./userAccount";
import { useState, useEffect } from "react";
import getShortInfoUser from "./api";
import { UserData } from "./types";Link

export default function Menu({ onClose }: { onClose: Function }) {

    const [userData, setUserData] = useState<UserData>();

    useEffect(() => {
        getShortInfoUser()
            .then((userData) => setUserData(userData))
            .catch(() => {});
    }, []);

    return (
        <div style={{ display: "none", width: "100%", zIndex: 4, position: "fixed" }}>
            <div className={styles.special_menu}>
                <div className={styles.header_menu}>
                    {
                        userData ?
                            <LinkToUserStudio {...userData} /> :
                            <LinkToLogin />
                    }
                    <button className={styles.close_menu_button} onClick={() => { onClose(); }}>
                        <span className="icon-close"></span>
                    </button>
                </div>
                {
                    userData &&
                    <Link href="http://studio.vision.com:3000/" className={styles.panel_link}>
                        <span className={styles.panel_link_title}>
                            Видеостудия 📸
                        </span>
                        <span className={styles.panel_link_description}>
                            “Сделай шаг, и дорога появится сама собой” - Steve Jobs
                        </span>
                    </Link>
                }
                <div className={styles.main_menu}>
                    <nav className={styles.nav}>
                        <Link href="/" className={styles.link}>
                            <span className={"icon-home" + " " + styles.icon}></span>
                            <div>
                                <span className={styles.title_link}>
                                    Главная
                                </span>
                                <span className={styles.title_description}>
                                    Подборка видео под ваши интересы
                                </span>
                            </div>
                        </Link>
                        <Link href="#" className={styles.link}>
                            <span className={"icon-fire" + " " + styles.icon}></span>
                            <div>
                                <span className={styles.title_link}>
                                    Популярно 🔥
                                </span>
                                <span className={styles.title_description}>
                                    Идём в ногу со временем вместе!
                                </span>
                            </div>
                        </Link>
                        <Link href="#" className={styles.link}>
                            <span className={"icon-info" + " " + styles.icon}></span>
                            <div>
                                <span className={styles.title_link}>
                                    Руководство пользователя
                                </span>
                                <span className={styles.title_description}>
                                    Что? Где? Когда?
                                </span>
                            </div>
                        </Link>
                        <Link href="#" className={styles.link}>
                            <span className={"icon-person" + " " + styles.icon}></span>
                            <div>
                                <span className={styles.title_link}>
                                    О нас
                                </span>
                                <span className={styles.title_description}>
                                    Расскажем о себе и то, чем мы занимаемся :)
                                </span>
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
        // <div className={styles.menu_panel_container}>
        //     <div id="menu_panel" className={styles.menu_panel}>
        //         <div className={styles.inner_closing_handle}>
        //             <span id="closing_handle" className={styles.closing_handle}></span>
        //         </div>
        //         <div id="menu_panel_content" className={styles.panel_content_spec}>
        //             <div id="panel_links" className={styles.panel_links}>

        //                 <Link className="account" href="http://vision/auth">
        //                     <p className="user_name">
        //                         Войти в аккаунт
        //                     </p>
        //                     <p className="description_account">
        //                         Чтобы комментировать, оценивать и публиковать видео для сообщества!
        //                     </p>
        //                 </Link>

        //             </div>
        //             <div id="menu_content" data-active-section-id className={styles.menu_content}>
        //                 <div className={styles.header_menu_content}>
        //                     <button id="backToPanelLinks" className={styles.back_to_panel_links}>
        //                         <span className="icon_arrow_left"></span>
        //                     </button>
        //                     <span id="nameActiveMenuContent" className={styles.header_content_title}>
        //                         {/* <!-- Наименование нажатой кнопки заносится с помощью JavaScript --> */}
        //                     </span>
        //                 </div>
        //                 <div className={styles.body_menu_content}>
        //                     <section data-section-id="Персонализация">
        //                         <div className={styles.setting_block}>
        //                             <div className={styles.setting_block_name}>
        //                                 Цветовая тема
        //                             </div>
        //                             <div className={styles.setting_block_items}>
        //                                 <div className={styles.setting}>
        //                                     <label for="selectColorTheme" className={styles.container_name_setting}>
        //                                         <span className={styles.name_setting}>
        //                                             Цветовая тема
        //                                         </span>
        //                                         <span className={styles.description_setting}>
        //                                             Выберите основную палитру цветов для нашего сайта
        //                                         </span>
        //                                     </label>
        //                                     <select id="selectColorTheme" className={styles.setting_input}>
        //                                         <option value="light">Светлая</option>
        //                                         <option value="dark">Тёмная</option>
        //                                         <option value="system">Авто</option>
        //                                     </select>
        //                                 </div>
        //                                 <div className={styles.setting}>
        //                                     <label for="hasContrast" className={styles.container_name_setting}>
        //                                         <span className={styles.name_setting}>
        //                                             Контраст
        //                                         </span>
        //                                         <span className={styles.description_setting}>
        //                                             Сделать цвета на сайте более контрастными
        //                                         </span>
        //                                     </label>
        //                                     <label className={styles.switch}>
        //                                         <input className={styles.switch_input} type='checkbox' />
        //                                     </label>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </section>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // </div>
    );

}