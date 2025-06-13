"use client";

// imports ================================================== //
import React from "react";
import Select from "./components/Select";
import type { SelectForm as SelectFormType } from "./types";
import styles from "./index.module.css";

// main ===================================================== //
const SelectForm: SelectFormType = ({
    description,
    children,
    ...inputProps
}) => {

    return (
        <label className={styles.label} >
            <span className={styles.description_select}>
                {description}
            </span>
            <Select {...inputProps}>
                {children}
            </Select>
        </label>
    );

};

// exports ================================================== //
export default SelectForm;