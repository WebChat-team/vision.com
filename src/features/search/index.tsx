import styles from "./index.module.css";

export default function Search() {

    return (
        <div className={styles.input_container}>
            <input className={styles.input} type="text" placeholder="Интересное, познавательное и весёлое" />
            <div className={styles.input_actions_container}>
                <button className={styles.input_action + " " + styles.input_search}>
                    <span className="icon-search"></span>
                </button>
                <button className={styles.input_action + " " + styles.input_filters}>
                    <span className="icon-filter"></span>
                </button>
            </div>
        </div>
    );

};