"use client";

import type { VideoSLide as VideoSLideType } from "./types";
import Video from "./Video";
import styles from "./index.module.css";
import VideoInfo from "./VideoInfo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setVideo } from "@/app/store/slices/video";
import { getVideoInfo } from "./api";
import { useAppSelector } from "@/app/store/hooks";

const VideoSlide: VideoSLideType = ({ id }) => {

    const dispatch = useDispatch();
    const videoData = useAppSelector(state => state.video.data);

    useEffect(() => {

        (async function a() {

            const videoInfoData = await getVideoInfo(id);

            if (videoInfoData) {
                dispatch(
                    setVideo(videoInfoData)
                );
            }

        })();

    }, [id]);

    return (
        <div className={styles.video_slide}>
            {videoData && <Video {...videoData} />}
            {videoData && <VideoInfo {...videoData} />}
        </div>
    );

};

export default VideoSlide;