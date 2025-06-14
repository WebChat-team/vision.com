"use client"

// imports ================================================== //
import "./styles/index.css";
import getVideo from "./scripts/index.js";
import { useEffect, useMemo, useRef } from "react";
import "./styles/index.css";
import { useAppSelector } from "@/app/store/hooks";
import { autoUpdateDurationPointVideo, viewVideo } from "./api";
import type { Video as VideoType } from "./types";
import useShimmer, { useStyleShimmer } from "@/shared/hooks/useShimmer/useShimmer";
import { VideoSlice } from "@/app/store/slices/video/types";
import getClassName from "@/shared/lib/getClassName";
import { formatUploadDate, pluralize } from "@/shared/lib/formatUploadDate";
import isProxy from "@/shared/lib/isProxy";
import styles from "./index.module.css";
import SelectVideoFile from "@/entities/uploadVideo/SelectVideoFile";
import SelectVideoFileOnPC from "./SelectVideoFileOnPC";
import load from "@/entities/uploadVideo/Video/scripts";

// main ===================================================== //
const Video: VideoType = ({ mode, videoData, setVideoFile }) => {

    const VideoApiRef = useRef<any>();
    const shimmerStyle = useStyleShimmer(videoData ? "success" : "loading");
    const path = (videoData && videoData.path) ? videoData.path : "";

    useEffect(() => {
        VideoApiRef.current = getVideo();
        VideoApiRef.current.volume = 0;
    }, []);

    // const VideoApiRef = useRef<any>();
    // const IdVideoRef = useRef(videoData.id);
    // const userData = useAppSelector(state => state.user.data);

    // useEffect(() => {

    //     if (!isProxy(videoData)) {

    //         if (!VideoApiRef.current) {
    //             VideoApiRef.current = getVideo();
    //         }

    //         VideoApiRef.current.volume = 0;

    //         IdVideoRef.current = videoData.id;

    //         if (VideoApiRef.current && userData) {
    //             VideoApiRef.current.currentTime = (videoData.user_view_duration / 1000);
    //             // @ts-ignore
    //             setTimeout(() => {
    //                 // @ts-ignore
    //                 VideoApiRef.current.dispatchEvent(new Event("timechange"));
    //             }, 1000);
    //         }

    //     }

    // }, [videoData]);

    // useEffect(() => {

    //     if (userData && videoData.is_viewed) {

    //         let isMounted = true;

    //         // @ts-ignore
    //         autoUpdateDurationPointVideo(IdVideoRef, VideoApiRef.current, () => isMounted);

    //         return () => {
    //             isMounted = false;
    //         };

    //     }

    // }, [videoData.id, videoData.is_viewed]);

    function handleTimeUpdate() {

        // if (
        //     VideoApiRef.current &&
        //     !videoData.is_viewed &&
        //     (0.05 * VideoApiRef.current.duration) <= VideoApiRef.current.currentTime
        // ) {
        //     viewVideo(videoData.id, Math.round(VideoApiRef.current!.currentTime * 1000));
        // }

    }

    return (
        <div
            id="container_video"
            className={getClassName("video_container", "adaptive_video", shimmerStyle)}
        >

            {
                !videoData &&
                <SelectVideoFileOnPC setVideoFile={setVideoFile} mode={mode} />
            }

            <div className="container_popup">
                <div id="darkness" className="darkness"></div>
                <div id="settings_popup" className="settings_popup">
                    <div className="header_settings_video">
                        <button id="backSetting" className="header_settings_button icon-arrow_left"></button>
                        <h3 id="nameSectionSettingPopup">
                            Настройки видеоплеера
                        </h3>
                    </div>
                    <div id="body_settings_popup" className="body_settings_popup">
                        <div className="item_body_settings_popup nav_settings">
                            <button data-name-setting="resolution_video" className="setting_video">
                                <span className="icon_setting icon-resolution-video"></span>
                                <div className="info_setting">
                                    <p className="title_setting">Качество видео</p>
                                    <p className="description_setting">Выберите разрешение и уровень сжатия видео</p>
                                </div>
                            </button>
                            <button data-name-setting="speed_video" className="setting_video">
                                <span className="icon_setting icon-speed-video"></span>
                                <div className="info_setting">
                                    <p className="title_setting">Скорость воспроизведения</p>
                                    <p className="description_setting">Выберите темп воспроизведения видео</p>
                                </div>
                            </button>
                            <button data-name-setting="timer_video" className="setting_video">
                                <span className="icon_setting icon-timer-video"></span>
                                <div className="info_setting">
                                    <p className="title_setting">Автовыключение</p>
                                    <p className="description_setting">Остановим воспроизведение видео через заданный промежуток времени</p>
                                </div>
                            </button>
                            <button data-name-setting="shortcuts_video" className="setting_video">
                                <span className="icon_setting icon-keyboard"></span>
                                <div className="info_setting">
                                    <p className="title_setting">Сочетания клавиш</p>
                                    <p className="description_setting">Настройте управление видеоплеером с помощью клавиатуры</p>
                                </div>
                            </button>
                            <button data-name-setting="volume_video" className="setting_video">
                                <span className="icon_setting icon-volume-video"></span>
                                <div className="info_setting">
                                    <p className="title_setting">Звук</p>
                                    <p className="description_setting">Настройте управление звуком видеоплеера</p>
                                </div>
                            </button>
                            <button data-name-setting="rewind_video" className="setting_video">
                                <span className="icon_setting icon-rewind-video"></span>
                                <div className="info_setting">
                                    <p className="title_setting">Перемотка видео</p>
                                    <p className="description_setting">Настройте интервал перемотки видео</p>
                                </div>
                            </button>
                        </div>
                        <div className="item_body_settings_popup main_setting">
                            <div id="listResolutionsVideo" data-name-setting="resolution_video" className="section_setting">
                                <button data-resolution="auto" className="resolution_button">
                                    Автоматически
                                </button>
                                {/* <!-- битрейт получаем от сервера! --> */}
                            </div>
                            <div data-name-setting="speed_video" className="section_setting">
                                <div className="value_speed_video">
                                    <input onChange={() => { }} type="number" min="0.15" value="1" max="2" step="0.05" id="speedVideo" className="input_speed_video" />
                                    <span className="suffix_input_speed_video">x</span>
                                </div>
                                <input onChange={() => { }} type="range" min="0.15" max="2" step="0.05" id="sliderSpeedVideo" className="slider_speed_video" />
                                <span className="liner">
                                    <span className="item_liner">0.15</span>
                                    <span className="item_liner">2</span>
                                </span>
                                <div id="selectSpeedItem" className="container_speed_items">
                                    <button data-value-speed="0.25" className="speed_item">
                                        0.25x
                                    </button>
                                    <button data-value-speed="0.5" className="speed_item">
                                        0.5x
                                    </button>
                                    <button data-value-speed="1" className="speed_item">
                                        1x
                                    </button>
                                    <button data-value-speed="1.25" className="speed_item">
                                        1.25x
                                    </button>
                                    <button data-value-speed="1.5" className="speed_item">
                                        1.5x
                                    </button>
                                    <button data-value-speed="1.75" className="speed_item">
                                        1.75x
                                    </button>
                                    <button data-value-speed="2" className="speed_item">
                                        2x
                                    </button>
                                </div>
                            </div>
                            <div data-name-setting="timer_video" className="section_setting">
                                <div className="timer">
                                    <input onChange={() => { }} type="number" className="timer_field" />
                                    <input onChange={() => { }} type="number" className="timer_field" />
                                    <input onChange={() => { }} type="number" className="timer_field" />
                                </div>
                            </div>
                            <div data-name-setting="shortcuts_video" className="section_setting">
                                {/* <!-- Комбинации клавиш через js --> */}
                            </div>
                            <div data-name-setting="volume_video" className="section_setting">
                                {/* <!-- Volume video --> */}
                            </div>
                            <div data-name-setting="rewind_video" className="section_setting">
                                <div className="rewind_video_item">
                                    <span className="description_rewind_item">
                                        Перемотка видео вперёд на заданный промежуток времени (в секундах)
                                    </span>
                                    <input onChange={() => { }} id="timeIntervalForwardRewindVideo" min="1" max="60" type="number" className="value_rewind_item" />
                                </div>
                                <div className="rewind_video_item">
                                    <span className="description_rewind_item">
                                        Перемотка видео назад на заданный промежуток времени (в секундах)
                                    </span>
                                    <input onChange={() => { }} id="timeIntervalBackRewindVideo" min="1" max="60" type="number" className="value_rewind_item" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer_settings_popup">
                        <button id="closeSettingsPopup" className="close_settings_popup" style={{ zIndex: 7 }}>
                            <div className="icon-close icon_player_button"></div>
                        </button>
                    </div>
                </div>
            </div>

            <video
                id="video"
                tabIndex={-1}
                className={"video_stream"}
                src={path}
                onTimeUpdate={videoData ? handleTimeUpdate : undefined}
            >
            </video>

            <div id="controls_container" className="controls_container">
                <div className="top_control_panel">
                    <div className="info_video">
                        {
                            videoData &&
                            <>
                                <h1 className="video_name">
                                    {videoData.name}
                                </h1>
                                {
                                    (typeof videoData.unique_views === "number" && videoData.timestamp && mode === "platform_view") &&
                                    <div className="video_time_metadata">
                                        <span className="video_views_counter">
                                            {`${videoData.unique_views} ${pluralize(videoData.unique_views, "просмотр", "просмотра", "просмотров")}`}
                                        </span>
                                        <span className="separator"></span>
                                        <span className="video_timestamp">
                                            {formatUploadDate(videoData.timestamp)}
                                        </span>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    <span id="timeVideo" className="time_video">
                        <span id="currentTime" className="current_time">
                            {videoData ? "0:00" : ""}
                        </span>
                        <span id="durationTime" className="duration_video">
                            {videoData ? "0:00" : ""}
                        </span>
                    </span>
                </div>
                <div id="bottom_control_panel" className="bottom_control_panel">
                    <div id="additional_info" className="additional_info">
                        <div id="selected_frame" className="selected_frame">
                            {/* <!-- перепиши на canvas --> */}
                            <video src={path} id="photo_selected_frame" className="photo_selected_frame"></video>
                            {/* <!-- <canvas id="photo_selected_frame" className="photo_selected_frame"></canvas> --> */}
                            <span id="time_selected_frame" className="time_selected_frame"></span>
                        </div>
                        <span id="snippet" className="snippet">
                            <span id="descriptionSnippet" className="message_snippet"></span>
                            <span id="keycupsSnippet"></span>
                        </span>
                    </div>
                    <div id="progress_viewing" className="video_progress_viewing">
                        <div className="view"></div>
                        <div id="viewing_progress_line" className="progress_viewing_line">
                            <div id="viewing_progress_slider" className="slider"></div>
                        </div>
                        <div id="next_point_view_progress" className="next_point_view_progress"></div>
                        <div id="buffered_lines" className="buffered_lines">
                            <div id="buffered_line" className="buffered_line"></div>
                        </div>
                    </div>
                    <div className="controls">
                        <div className="lefl_controls">
                            <button id="playbackSwitchVideo" className="player_button icon_playback_switch_video" data-icons="play, pause, reload, loading">
                                <div className="icon-play icon_player_button"></div>
                            </button>
                            <div id="video_volume_control" className="video_volume_control">
                                <div id="volume_progress_line" className="volume_progress_line">
                                    <div id="volume_slider" className="player_button volume_slider" data-icons="volume-low, volume-high, volume-mute">
                                        <div className="icon-volume-mute icon_player_button"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right_controls">
                            <button id="fullScreenSwitch" className="player_button" data-icons="fullsize, minisize">
                                <div className="icon-fullsize icon_player_button"></div>
                            </button>
                            <button id="settingsVideo" className="player_button" data-icons="close, settings">
                                <div className="icon-settings icon_player_button"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Video;