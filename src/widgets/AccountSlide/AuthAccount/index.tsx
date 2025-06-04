import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserAgreement from "./UserAgreement";
import styles from "./index.module.css";

const AuthAccount = () => {

    const [typeAuth, setTypeAuth] = useState<"login" | "register">("login");

    return (
        <div className={styles.auth_account}>
            <button
                className={styles.switch_auth}
                onClick={() => setTypeAuth(typeAuth => typeAuth === "login" ? "register" : "login")}
            >
                {
                    typeAuth === "login"
                        ? "Создать аккаунт"
                        : "Войти в аккаунт"
                }
            </button>
            <div className={styles.auth_form_container}>
                {typeAuth === "login" && <LoginForm />}
                {typeAuth === "register" && <RegisterForm />}
            </div>
            <UserAgreement />
        </div>
    );

}

export default AuthAccount;