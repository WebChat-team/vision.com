// imports ================================================== //
import getControl from "./control.js";

// helpers ================================================== //

// main ===================================================== //
export default function getPlaybackSwitchVideo(videoApi) {

    // события playbackswitch
    const playbackSwitchVideo = getControl("playbackSwitchVideo");
    playbackSwitchVideo.addEventListener("click", () => {
        videoApi[videoApi.paused ? "play" : "pause"]();
    });

    // события video
    let previousPlaybackSwitchVideo = null;
    videoApi.addEventListener("play", () => {
        playbackSwitchVideo.changeIconStatus("pause");
        previousPlaybackSwitchVideo = "pause";
    });
    videoApi.addEventListener("pause", () => {
        playbackSwitchVideo.changeIconStatus("play");
        previousPlaybackSwitchVideo = "play";
    });
    videoApi.addEventListener("ended", () => {
        playbackSwitchVideo.changeIconStatus("reload");
        videoApi.currentTime = videoApi.duration;
    });
    videoApi.addEventListener("canplaythrough", () => {
        if (previousPlaybackSwitchVideo) {
            playbackSwitchVideo.changeIconStatus(previousPlaybackSwitchVideo);
        }
    });

    // slider
    let previousStatusForMoving = null;
    videoApi.addEventListener("waiting", () => {
        playbackSwitchVideo.changeIconStatus("loading");
    });
    videoApi.addEventListener("movingSlider", () => {
        if (!videoApi.paused) {
            videoApi.pause();
            previousStatusForMoving = "play";
        } else {
            previousStatusForMoving = "pause";
        }
    });
    videoApi.addEventListener("movedSlider", () => {
        if (previousStatusForMoving) videoApi[previousStatusForMoving]();
        previousStatusForMoving = null;
    });
    videoApi.controlsElement.addEventListener("mousedown", (eventMouseDown) => {

        if (videoApi.controlsElement === eventMouseDown.target) {
            videoApi.controlsElement.addEventListener("mouseup", (eventMouseUp) => {
                if (videoApi.controlsElement === eventMouseUp.target) {
                    playbackSwitchVideo.click();
                }
            }, { once: true });
        }

    });

    return playbackSwitchVideo;

}