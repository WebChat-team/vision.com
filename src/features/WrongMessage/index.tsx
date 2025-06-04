// imports ================================================== //
import Button from "@/shared/ui/Button";
import styles from "./index.module.css";
import type { WrongMessage as WrongMessageType } from "./types";
import Portal from "@/shared/ui/Portal";

// main ===================================================== //
const WrongMessage: WrongMessageType = ({ close, text }) => {

    return (
        <Portal>
            <div className={styles.wrong_message}>
                <div className={styles.header}>
                    <span className={styles.title}>
                        Ошибка при отправке формы
                    </span>
                    <Button level="secondary" className={styles.close_button} onClick={close}>
                        X
                    </Button>
                </div>
                <div className={styles.main}>
                    <span className={styles.text}>
                        {text}
                    </span>
                </div>
            </div>
        </Portal>
    );

}

// exports ================================================== //
export default WrongMessage;