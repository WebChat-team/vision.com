"use client"

import { useEffect, useState } from "react";
import type { InfoVideo } from "./types";
import getInfoVideo from "./api";
import styles from "./index.module.css";
import { formatUploadDate } from "@/shared/lib/formatUploadDate";
import Link from "next/link";
import { getChannelData } from "../previewVideo/api";

export default function InfoVideo({ video_id }: { video_id: string }) {

    const [videoData, setVideoData] = useState<InfoVideo>();
    const [userData, setUserData] = useState<{ avatar_url: string, name: string }>();

    useEffect(() => {
        getInfoVideo(video_id)
            .then(async (video_data) => {
                if (video_data.user_id) {
                    const user_data = await getChannelData(video_data.user_id);
                    setVideoData(video_data);
                    setUserData(user_data);
                }
            });

    }, []);

    return (
        <div className={styles.info_video}>
            <h1 className={styles.title}>
                {videoData?.name}
            </h1>
            <div className={styles.additional_info}>
                <span className={styles.views_counter}>
                    0 просмотров
                </span>
                <span>
                    •
                </span>
                <span className={styles.date}>
                    {videoData?.timestamp && formatUploadDate(videoData.timestamp)}
                </span>
            </div>
            <div className={styles.action_panel}>
                <Link href={`/channel?id=${videoData?.user_id}`} className={styles.channel_link}>
                    <img src={userData?.avatar_url} className={styles.channel_photo} />
                    <span className={styles.channel_name}>
                        {userData?.name}
                    </span>
                    <button className={styles.channel_subscribe}>
                        0
                        <span style={{ marginLeft: "5px" }} className="material-symbols-outlined">
                            star
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );

}