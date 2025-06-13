// imports ================================================== //
import getControl from "./control.js";
import range from "../lib/math.js";

// main ===================================================== //
function getVolumeControl(videoApi) {

    // события volume
    const VOLUME = Object.assign(
        document.getElementById("video_volume_control"),
        {
            slider: getControl("volume_slider"),
            progressLine: document.getElementById("volume_progress_line")
        }
    );
    VOLUME.addEventListener("mousedown", (eventMouseDown) => {

        const min = VOLUME.slider.offsetWidth / 2;
        const max = VOLUME.offsetWidth - VOLUME.slider.offsetWidth / 2;
        const leftVolumeSlider = VOLUME.getBoundingClientRect().left;

        function move(eventMove) {
            const newWidthProgressLine = range(min, (eventMove.clientX - leftVolumeSlider), max);
            const newValue = (newWidthProgressLine - min) / (max - min);
            videoApi.volume = newValue;
        }

        move(eventMouseDown);

        window.addEventListener("mousemove", move);

        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", move);
        });

    });

    // событие video
    videoApi.addEventListener("volumechange", () => {

        const min = VOLUME.slider.offsetWidth / 2;
        const max = VOLUME.offsetWidth - VOLUME.slider.offsetWidth / 2;
        VOLUME.progressLine.style.width = (min * 2) + (videoApi.volume * (max - min)) + "px";

        if (videoApi.volume === 0) {
            VOLUME.slider.changeIconStatus("volume-mute");
        } else if (videoApi.volume < 0.5) {
            VOLUME.slider.changeIconStatus("volume-low");
        } else {
            VOLUME.slider.changeIconStatus("volume-high");
        }

    });

    return VOLUME;

}

// exports ================================================== //
export default getVolumeControl;