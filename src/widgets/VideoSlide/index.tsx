"use client";

import type { VideoSLide as VideoSLideType } from "./types";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import VideoActions from "./VideoActions";
import VideoComments from "./VideoComments";
import Video from "./Video";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setVideo } from "@/app/store/slices/video";
import { useStyleShimmer } from "@/shared/hooks/useShimmer/useShimmer";
import PublishVideoForm from "./Video/PublishVideoForm";

const VideoSlide: VideoSLideType = ({ }) => {

    const videoData = useAppSelector(state => state.video.data);
    const videoMode = useAppSelector(state => state.video.mode);
    const stylesShimmer = useStyleShimmer(videoData ? "success" : "loading");
    const userData = useAppSelector(state => state.user.data);

    const [hasComments, setHasComments] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    useEffect(() => {
        setHasComments(false);
        if (videoMode === "platform_view") {
            setVideoFile(null);
        }
    }, [videoMode]);

    return (
        <div className={styles.video_slide}>
            <Video setVideoFile={setVideoFile} mode={videoMode} className={stylesShimmer} videoData={videoData} />
            <VideoActions hasComments={hasComments} setHasComments={setHasComments} />
            {hasComments && <VideoComments />}
            {userData && videoMode === "studio_view" && <PublishVideoForm videoFile={videoFile} />}
        </div>
    );

};

export default VideoSlide;