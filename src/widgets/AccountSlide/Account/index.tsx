"use client"

import styles from "./index.module.css";
import ShortUserInfo from "./ShortUserInfo";
import type { UserAccount as UserAccountType } from "./types";
import { useState } from "react";
import ListVideos from "./ListVideos";
import Subscribers from "./Subscribers";
import Button from "@/shared/ui/Button";
import { useAppDispatch } from "@/app/store/hooks";
import { setUser } from "@/app/store/slices/user";

const UserAccount: UserAccountType = (userData) => {

    const [section, setSection] = useState<"upload" | "subscribers" | "videos" | "subscribtions">("subscribers");
    const dispatch = useAppDispatch();

    async function handleClickExit() {

        const response = await fetch(
            "/logout/api",
            { method: "DELETE" }
        );

        if (response.ok) {
            dispatch(setUser(null));
        }

    }

    return (
        <div className={styles.container_account}>
            <div className={styles.user_account}>
                <ShortUserInfo {...userData} setSection={setSection} />
                <Button
                    wide={true}
                    type="secondary"
                    onClick={handleClickExit}
                >
                    Выйти
                </Button>
            </div>
            <div className={styles.conatiner_section}>
                {section === "subscribers" && <Subscribers user_id={userData.id} />}
                {section === "videos" && <ListVideos user_id={userData.id} />}
            </div>
        </div>
    );

};

export default UserAccount;