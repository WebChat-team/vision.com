"use client";

import { formatUploadDate, pluralize } from "@/shared/lib/formatUploadDate";
import styles from "./index.module.css";
import type { VideoInfo as VideoInfoType } from "./types";

const VideoInfo: VideoInfoType = ({ id, name, description, channel, has_load, age_limit, timestamp, unique_views }) => {

    return (
        <div className={styles.video_info}>
            <h2 className={styles.video_name}>
                {name}
            </h2>
            <div className={styles.video_time_metadata}>
                <span className={styles.video_views}>
                    {`${unique_views} ${pluralize(unique_views, "просмотр", "просмотра", "просмотров")}`}
                </span>
                <span className={styles.separator}></span>
                <span className={styles.video_timestamp}>
                    {formatUploadDate(timestamp)}
                </span>
            </div>
            <div className={styles.container_metadata}>
                <div className={styles.channel_preview}>
                    <img
                        className={styles.channel_img}
                        src={channel.avatar_url}
                        alt="Изображение канала"
                    />
                    <span className={styles.channel_name}>
                        {channel.name}
                    </span>
                    <button className={styles.subscribe_channel}>
                        {channel.subscriptionCounter}
                        <img src="/icons/star.svg" alt="Пятиконечная звезда" width={25} height={25} />
                    </button>
                </div>
            </div>
        </div>
    );

};

export default VideoInfo;