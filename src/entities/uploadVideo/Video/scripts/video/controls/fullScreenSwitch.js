// imports ================================================== //
import getControl from "./control.js";

// main ===================================================== //
export default function getFullScreenSwitchVideo(videoApi) {

    const fullScreenSwitchVideo = getControl("fullScreenSwitch");
    if (!fullScreenSwitchVideo) {
        console.warn("Элемент #fullScreenSwitch не найден!");
        return null;
    }

    // события fullscreen switch
    fullScreenSwitchVideo.addEventListener("click", () => {
        videoApi[videoApi.minimized ? "fullSize" : "miniSize"]();
    });

    // события video
    videoApi.addEventListener("fullsize", () => {
        fullScreenSwitchVideo.changeIconStatus("minisize");
    });
    videoApi.addEventListener("minisize", () => {
        fullScreenSwitchVideo.changeIconStatus("fullsize");
    });

    return fullScreenSwitchVideo;

};