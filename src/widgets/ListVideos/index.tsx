"use client"

import { useState, useEffect } from "react";
import getListVideos from "./api";
import Loader from "@/shared/ui/Loader";
import PreviewVideo from "@/entities/previewVideo";
import { PreviewData } from "next";
import styles from "./index.module.css";

export default function ListVideos() {

    const [listVideos, setListVideos] = useState<PreviewData[]>();

    useEffect(() => {
        getListVideos().then((data) => setListVideos(data))
    }, []);

    return (
        <>
            {!listVideos && <Loader />}
            {
                listVideos &&
                <div className={styles.list_previews}>
                    {/* @ts-ignore */}
                    {listVideos.map(data => <PreviewVideo key={data.timestamp} {...data} />)}
                </div>
            }
        </>
    );

}