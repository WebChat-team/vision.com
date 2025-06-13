// imports ================================================== //
import getClassName from "@/shared/lib/getClassName";
import styles from "./index.module.css";
import { ActionVideo as ActionVideoType } from "./types";

// main ===================================================== //
const ActionVideo: ActionVideoType = ({ icon, children, ...props }) => {

    let { className, ...any_props } = props;

    return (
        <button
            className={getClassName(props.className, styles.action_video)}
            {...any_props}
        >
            <img src={icon} className={styles.action_icon} />
            {children}
        </button>
    );

};

// exports ================================================== //
export default ActionVideo;