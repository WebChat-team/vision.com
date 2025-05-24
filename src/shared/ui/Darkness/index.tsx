import { createPortal } from "react-dom";
import styles from "./index.module.css";
import Animate from "../Animate";
import { hide, show } from "./constants";

export default function Darkness({ has }: { has: boolean }) {

    return (
        createPortal(
            <Animate has={has} onShow={show} onHide={hide}>
                <div className={styles.darkness}></div>
            </Animate>,
            document.body
        )
    );

}