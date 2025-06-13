"use client"

// imports ================================================== //
import type { Checkbox as CheckboxType } from "./types";
import styles from "./index.module.css";
import { useState } from "react";

// main ===================================================== //
const Checkbox: CheckboxType = ({ title, description, checked, ...props }) => {

    const [isChecked, setIsChecked] = useState(checked || false);

    return (
        <label className={styles.checkbox}>
            <div>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
            </div>
            <div>
                <div className={styles.switch}>
                    <input
                        // @ts-ignore
                        onChange={() => setIsChecked(value => !value)}
                        checked={isChecked}
                        type="checkbox"
                        className={styles.switch_input}
                        {...props}
                    />
                </div>
            </div>
        </label>
    );

}

// exports ================================================== //
export default Checkbox