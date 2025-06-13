"use client";

import styles from "./index.module.css";
import type { PreviewVideoData } from "./types";
import { useEffect, useState } from "react";
import { getChannelData } from "./api";
import { formatDuration } from "./helpers/formatDuration";
import { formatUploadDate, pluralize } from "@/shared/lib/formatUploadDate";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setVideo } from "@/app/store/slices/video";
import { getVideoInfo } from "@/widgets/VideoSlide/api";
import { addPanel, setActive } from "@/app/store/slices/panelManager";

// @ts-ignore
export default function PreviewVideo({ id, user_id, name, author_name, author_avatar, timestamp, unique_views }: PreviewVideoData) {

    const [userData, setUserData] = useState<any>();
    const [duration, setDuration] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const videoData = useAppSelector(state => state.video.data);
    const includesPanels = useAppSelector(state => state.panel_manager.includes);

    useEffect(() => {
        getChannelData(user_id).then((data) => setUserData(data));
    }, []);

    async function handleClick() {

        if (isLoading) return;

        setIsLoading(true);

        const data = await getVideoInfo(id);

        if (data) {

            dispatch( setVideo({ data: Object.assign(data, { path: `http://s3.vision.com:3002/video?v=${data.id}` }), mode: "platform_view" }) );

            if ("watch" in includesPanels) {
                dispatch(setActive({ type: "name", name: "watch" }));
            } else {
                dispatch(addPanel({ panelName: "watch" }))
            }
        }

        setIsLoading(false);

    }

    return (
        <button onClick={handleClick} className={styles.preview_video}>
            <div className={styles.video_preview_container}>
                {
                    videoData && videoData.id === id &&
                    <div className={styles.is_viewing_video}>
                        <span className={styles.circle_viewing_video}></span>
                    </div>
                }
                {/* @ts-ignore */}
                <video onLoadedMetadata={(event) => { setDuration(formatDuration(event.target.duration)) }} className={styles.preview_photo} src={`http://s3.vision.com:3002/video?v=${id}`}></video>
                <span className={styles.time_video}>
                    {duration}
                </span>
            </div>
            <div className={styles.info_preview_video}>
                <div className={styles.info}>
                    <h3 className={styles.title}>
                        {name}
                    </h3>
                    {
                        (typeof unique_views === "number" && timestamp) &&
                        <div className={styles.stat_container}>
                            <span>
                                {`${unique_views} ${pluralize(unique_views, "просмотр", "просмотра", "просмотров")}`}
                            </span>
                            <span className={styles.separator}></span>
                            <span>
                                {formatUploadDate(timestamp)}
                            </span>
                        </div>
                    }
                </div>
            </div>
        </button>
    );

}