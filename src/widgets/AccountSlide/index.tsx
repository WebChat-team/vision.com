"use client";

import { useAppSelector } from "@/app/store/hooks";
import Account from "./Account";
import AuthAccount from "./AuthAccount";
import styles from "./index.module.css";

const AccountSlide = () => {

    const userData = useAppSelector(state => state.user.data);

    return (
        <div className={styles.account_slice}>
            {
                userData
                ? <Account {...userData} />
                : <AuthAccount />
            }
        </div>
    );

};

export default AccountSlide;