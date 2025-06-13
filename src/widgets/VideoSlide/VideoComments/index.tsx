// imports ================================================== //
import getClassName from "@/shared/lib/getClassName";
import styles from "./index.module.css";
import type { VideoComments as VideoCommentsType } from "./types";
import { useEffect, useState } from "react";
import useShimmer from "@/shared/hooks/useShimmer/useShimmer";
import { VideoCommentsSlice } from "@/app/store/slices/videoComments/types";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import getVideoComments from "./api";
import { setVideoComments } from "@/app/store/slices/videoComments";
import VideoComment from "./VideoComment";
import AddVideoComment from "./AddVideoComment";

// main ===================================================== //
const VideoComments: VideoCommentsType = ({ }) => {

    const dispatch = useAppDispatch();

    const videoId = useAppSelector(state => state.video.data?.id);
    const [videoComments, shimmer_style] = useShimmer<VideoCommentsSlice>(
        useAppSelector(state => state.video_comments)
    );
    const userData = useAppSelector(state => state.user.data);
    const [isUpdateComments, setIsUpdateComments] = useState(false);

    useEffect(
        () => {

            if (videoId) {

                (async function () {

                    const videoComments = await getVideoComments(videoId);

                    if (videoComments) {
                        dispatch(setVideoComments(videoComments.data));
                        setIsUpdateComments(false);
                    }

                })();

            }

        },
        [videoId, isUpdateComments]
    );

    return (
        <div className={styles.video_comments}>
            <p className={styles.name_section}>
                Комментарии
            </p>
            <div className={getClassName(styles.list_comments, shimmer_style)}>
                {
                    videoComments.data &&
                    videoComments.data.map((commentData) => (
                        <VideoComment
                            setIsUpdateComments={setIsUpdateComments}
                            key={commentData.id}
                            {...commentData}
                        />
                    ))
                }
            </div>
            {
                (userData && videoId) &&
                <AddVideoComment video_id={videoId} setIsUpdateComments={setIsUpdateComments} />
            }
        </div>
    );

};

// exports ================================================== //
export default VideoComments;