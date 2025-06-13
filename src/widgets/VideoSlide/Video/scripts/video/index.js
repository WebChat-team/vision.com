"use strict";

// imports ================================================== //
// controls
import getProgressViewingControl from "./controls/progressViewingControl.js";
import getSelectedFrame from "./controls/selectedFrame.js";
import getVideoAPI from "./controls/video.js";
import getVolumeControl from "./controls/volumeControl.js";
import getPlaybackSwitchVideo from "./controls/playbackSwitch.js";
import getFullScreenSwitchVideo from "./controls/fullScreenSwitch.js";
import getTimeVideo from "./controls/timeVideo.js";
import getSettings from "./controls/settings.js";
// popups
import addPopupManagerForVideoPlayer from "./popupManager/index.js";
import addSnippet from "./controls/snippet.js";
// libs
import range from "./lib/math.js";
import shortcutManager from "../shortcutManager/index.js";

// main ===================================================== //
export default function getVideo() {

    const videoApi = getVideoAPI("video");

    // дополняет video api, поэтому раньше всех
    addPopupManagerForVideoPlayer(videoApi);
    const progressViewing = getProgressViewingControl(videoApi);

    // независимые друг от друга модули
    const playbackSwitchVideo = getPlaybackSwitchVideo(videoApi);
    const volumeControl = getVolumeControl(videoApi);
    const fullScreenSwitchVideo = getFullScreenSwitchVideo(videoApi);
    const settingsVideo = getSettings(videoApi);
    getSelectedFrame(videoApi);
    getTimeVideo(videoApi);

    // shortcuts для видеоплеера
    shortcutManager
        .add({
            shortcut: ["shift", "ArrowLeft"],
            actionName: "video_rewind_back",
            description: "Перемотать видео назад",
            action: videoApi.rewind.back,
            section: "settings"
        })
        .add({
            shortcut: ["shift", "ArrowRight"],
            actionName: "video_rewind_forward",
            description: "Перемотать видео вперед",
            action: videoApi.rewind.forward,
            section: "settings"
        })
        .add({
            shortcut: ["shift", "KeyM"],
            actionName: "mute_volume_video",
            description: "Выключить звук видеоплеера",
            action() { videoApi.volume = 0; },
            section: "settings"
        })
        .add({
            shortcut: ["shift", "Space"],
            actionName: "play_video",
            description: "Воспроизведение",
            action() { playbackSwitchVideo.click(); },
            section: "settings"
        })
        .add({
            shortcut: ["shift", "ArrowUp"],
            actionName: "volume_up_video",
            description: "Увеличение громкости видео на 0.05",
            action() { videoApi.volume = range(0, videoApi.volume + 0.05, 1); },
            section: "settings"
        })
        .add({
            shortcut: ["shift", "ArrowDown"],
            actionName: "volume_down_video",
            description: "Уменьшение громкости видео на 0.05",
            action() { videoApi.volume = range(0, videoApi.volume - 0.05, 1); },
            section: "settings"
        })
        .add({
            shortcut: ["shift", "KeyR"],
            actionName: "fullscreen_video",
            description: "Переход/выход из полноэкранного режима",
            action() { fullScreenSwitchVideo.click(); },
            section: "settings"
        })
        .add({
            shortcut: ["shift", "KeyS"],
            actionName: "settings_video",
            description: "Открыть/закрыть настройки видеоплеера",
            action() { settingsVideo.click(); },
            section: "settings"
        });

    // Привязка сниппетов с id-шорткатов
    addSnippet(progressViewing, playbackSwitchVideo, "Востроизведение", "play_video");
    addSnippet(progressViewing, volumeControl, "Громкость", ["volume_up_video", "volume_down_video"]);
    addSnippet(progressViewing, fullScreenSwitchVideo, "Во весь экран", "fullscreen_video");
    addSnippet(progressViewing, settingsVideo, "Настройки", "settings_video");

    return videoApi;

}