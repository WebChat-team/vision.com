import { UserData } from "../types";
import styles from "./index.module.css";
import Link from "next/link";

export const LinkToUserStudio = ({ avatar_url, name }: UserData) => {

    return (
        <Link href="http://id.vision.com:3000/account" className={styles.link_to_user_studio}>
            <img className={styles.user_photo} src={avatar_url} alt="" />
            <div className={styles.container_user_name}>
                <span className={styles.username}>
                    {name}
                </span>
                <span className={styles.additional_info}>
                    Видео, комментарии, статистика
                </span>
            </div>
        </Link>
    );

};
export const LinkToLogin = () => {

    return (
        <Link href="http://id.vision.com:3000/login" className={styles.link_to_id}>
            <span className={styles.action_text}>
                Войдите или создайте аккаунт
            </span>
        </Link>
    );

};
