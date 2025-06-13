"use client";

import { useDebounce } from "@/shared/hooks/useDebounce";
// imports ================================================== //
import styles from "./index.module.css";
import { SearchField as SearchFieldType } from "./types";
import { useState, useEffect } from "react";

// main ===================================================== //
const SearchField: SearchFieldType = ({ setSearchQuery, searchQuery }) => {

    const [inputValue, setInputValue] = useState(searchQuery);
    const debouncedValue = useDebounce(inputValue, 750);

    useEffect(() => {
        setSearchQuery(debouncedValue);
    }, [debouncedValue, setSearchQuery]);

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    return (
        <div className={styles.input_container}>
            <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value.trim())}
                className={styles.input}
                type="text" 
                placeholder="Интересное, познавательное и весёлое"
            />
            <div className={styles.input_actions_container}>
                <button 
                    className={`${styles.input_action} ${styles.input_search}`}
                    onClick={() => setSearchQuery(inputValue)}
                >
                    <span className="icon-search"></span>
                </button>
            </div>
        </div>
    );
    
};

// exports ================================================== //
export default SearchField;