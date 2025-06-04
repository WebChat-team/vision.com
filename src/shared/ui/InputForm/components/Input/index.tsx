// imports =================================================== //
import styles from './index.module.css';
import type { ChangeEvent, FocusEvent } from 'react';
import { forwardRef, useEffect, useState, } from "react";
import { Props as PropsInputForm } from './types';
import { PropsInput } from '@/shared/types/propsHtmlElements';

// main ====================================================== //
const Input = forwardRef<HTMLInputElement, PropsInput & PropsInputForm>(
    ({ onChange, onFocus, isClear, defaultValue, ...props },  ref) => {

        const [inputValue, setInputValue] = useState(defaultValue || "");
        useEffect(() => { if (isClear) setInputValue(""); }, [isClear]);

        function hanleChange(event: ChangeEvent<HTMLInputElement>) {

            setInputValue(event.target.value);

            if (onChange) {
                onChange(event);
            }

        }

        return (
            <input
                ref={ref}
                value={inputValue}
                className={styles.input}
                onChange={hanleChange}
                {...props}
            />
        );

    }
);

// exports ================================================== //
export default Input;