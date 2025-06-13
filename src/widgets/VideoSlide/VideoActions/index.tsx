"use client";

import styles from "./index.module.css";
import type { VideoActions as VideoActionsType } from "./types";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import getClassName from "@/shared/lib/getClassName";
import CommentsVideoAction from "./CommentsVideoAction";
import LikeVideoAction from "./LikeVideoAction";
import SubscriptionsChannelAction from "./SubscriptionsChannelAction";
import { useState } from "react";
import ActionVideo from "@/shared/ui/ActionVideo";
import { setVideo, setVideoMode } from "@/app/store/slices/video";
import { addPanel } from "@/app/store/slices/panelManager";

const VideoActions: VideoActionsType = ({ hasComments, setHasComments }) => {

    const videoData = useAppSelector(state => state.video.data);
    const userData = useAppSelector(state => state.user.data);
    const videoMode = useAppSelector(state => state.video.mode);

    const [isVisibleModes, setIsVisibleModes] = useState(false);

    const dispatch = useAppDispatch();

    return (
        <div className={styles.video_actions}>
            <div className={styles.group_action}>
                {
                    videoData && videoData.channel && !isVisibleModes &&
                    <>
                        <img
                            className={getClassName(styles.circle, styles.channel_img)}
                            src={videoData.channel.avatar_url}
                            alt="Изображение канала"
                        />
                        {
                            videoMode === "platform_view" && (videoData.channel.id && userData && userData.id !== videoData.channel.id) &&
                            <SubscriptionsChannelAction channel_id={videoData.channel.id} />
                        }
                    </>
                }
                {
                    videoData && userData && videoData.channel && videoData.channel.id === userData.id && !isVisibleModes && videoData.id &&
                    <ActionVideo
                        icon="icons/edit.svg"
                        onClick={() => dispatch(setVideoMode(videoMode === "platform_view" ? "studio_view" : "platform_view" as any))}
                    />
                }
            </div>
            <div className={styles.group_action}>
                {
                    !isVisibleModes &&
                    <>
                        {
                            videoMode !== "personal_view" && videoData && videoData.id &&
                            <>
                                {
                                    Boolean(videoData.id) &&
                                    <LikeVideoAction id={videoData.id} />
                                }
                                {
                                    Boolean(videoData.has_comments) &&
                                    <CommentsVideoAction video_id={videoData.id} hasComments={hasComments} setHasComments={setHasComments} />
                                }
                            </>
                        }
                        {
                            videoMode === "personal_view" && videoData && userData &&
                            <ActionVideo
                                icon="icons/publish.svg"
                                onClick={() => dispatch(setVideoMode(videoMode === "personal_view" ? "studio_view" : "personal_view" as any))}
                                className={videoMode === "personal_view" ? styles.active : ""}
                            />
                        }
                    </>
                }
            </div>
            <div className={styles.group_action}>
                {
                    isVisibleModes &&
                    ["personal_view", "platform_view"].map((type_mode) => (
                        type_mode !== videoMode &&
                        <ActionVideo
                            key={type_mode}
                            icon={`icons/${type_mode}.svg`}
                            onClick={() => {

                                switch (type_mode) {

                                    case "personal_view":
                                        dispatch(setVideo({ data: null, mode: type_mode as any }));
                                        break;

                                    case "platform_view":
                                        dispatch(addPanel({ panelName: "search" }))
                                        dispatch(setVideo({ data: null, mode: type_mode as any }));
                                        break;

                                }

                                setIsVisibleModes(false);

                            }}
                        />
                    ))
                }
                <ActionVideo
                    icon={`icons/${videoMode === "platform_view" ? videoMode : "personal_view"}.svg`}
                    onClick={() => setIsVisibleModes(currentVisible => !currentVisible)}
                    className={styles.active_mode}
                />
            </div>
        </div>
    );

};

export default VideoActions;