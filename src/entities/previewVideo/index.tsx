"use client";

import Link from "next/link";
import styles from "./index.module.css";
import type { PreviewVideoData } from "./types";
import { useEffect, useRef, useState } from "react";
import { UserData } from "../menu/types";
import { getChannelData } from "./api";
import { formatDuration } from "./helpers/formatDuration";
import { useRouter } from "next/navigation";
import { formatUploadDate } from "@/shared/lib/formatUploadDate";

export default function PreviewVideo({ id, user_id, name, timestamp }: PreviewVideoData) {

    const [userData, setUserData] = useState<UserData>();
    const [duration, setDuration] = useState();
    const router = useRouter();

    useEffect(() => {
        getChannelData(user_id).then((data) => setUserData(data));
    }, []);

    return (
        <a href={`/watch?v=${id}`} className={styles.preview_video}>
            <div className={styles.video_preview_container}>
                {/* @ts-ignore */}
                <video onLoadedMetadata={(event) => setDuration(formatDuration(event.target.duration))} className={styles.preview_photo} src={`http://s3.vision.com:3002/video?v=${id}`}></video>
                <span className={styles.time_video}>
                    {duration}
                </span>
            </div>
            <div className={styles.info_preview_video}>
                <div className={styles.info}>
                    <span className={styles.title}>
                        {name}
                    </span>
                    <span className={styles.additional_info}>
                        <span>
                            {formatUploadDate(timestamp)}
                        </span>
                    </span>
                </div>
                {
                    userData &&
                    <div onClick={() => router.push(`http://vision.com:3005/channel?id=${user_id}`)} className={styles.channel}>
                        <img src={userData.avatar_url} className={styles.channel_photo} />
                        <span className={styles.channel_name}>
                            {userData.name}
                        </span>
                    </div>
                }
            </div>
        </a>
    );

}