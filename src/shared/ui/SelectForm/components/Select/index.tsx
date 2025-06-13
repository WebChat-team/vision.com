// imports =================================================== //
import styles from './index.module.css';
import type { ChangeEvent } from 'react';
import { useState, } from "react";
import { Select as SelectType } from './types';

// main ====================================================== //
const Select: SelectType = (({ onChange, onFocus, value, children, ...props }) => {

        const [selectValue, setSelectValue] = useState(value || "");

        function hanleChange(event: ChangeEvent<HTMLSelectElement>) {

            setSelectValue(event.target.value);

            if (onChange) {
                onChange(event);
            }

        }

        return (
            <select
                value={selectValue}
                className={styles.select}
                onChange={hanleChange}
                {...props}
            >
                {children}
            </select>
        );

    }
);

// exports ================================================== //
export default Select;