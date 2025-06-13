"use client";

import { ChangeEvent } from "react";
import styles from "./index.module.css";
import type { ReactNode } from "react";

export default function SelectVideoFile({ children, setSelectedVideoFile }: { children: ReactNode, setSelectedVideoFile: (videoFile: File) => void }) {

    function handleChange(event: ChangeEvent<HTMLInputElement>) {

        event.preventDefault();

        if (event.target.files?.length) {
            setSelectedVideoFile(event.target.files[0]);
        }
        
    }

    return (
        <label className={styles.container}>
            {children}
            <label htmlFor="upload_file_input" className={styles.button_select_files}>
                Выбрать файлы
            </label>
            <input id="upload_file_input" type="file" accept="video/*" onChange={handleChange} style={{ display: "none" }} />
        </label>
    );

}