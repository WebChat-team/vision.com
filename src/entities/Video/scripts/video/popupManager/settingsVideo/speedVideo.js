// imports ================================================== //
import range from "../../lib/math.js";

// main ===================================================== //
export default function getSettingsSpeedVideo(videoApi) {

    const speedVideo = document.getElementById("speedVideo");
    const sliderSpeedVideo = document.getElementById("sliderSpeedVideo");
    const selectSpeedItem = document.getElementById("selectSpeedItem");
    let buttons = selectSpeedItem.querySelectorAll("button[data-value-speed]");

    function setValue(value) {
        
        const newValue = range(speedVideo.min, Number(value), speedVideo.max);

        sliderSpeedVideo.value = newValue;

        speedVideo.value = newValue;
        videoApi.playbackRate = newValue;
        speedVideo.style.width = ((speedVideo.value.length + 1) * 8) + 'px';

        return newValue;

    }

    speedVideo.addEventListener("change", (event) => {
        setValue(event.target.value);
    });
    speedVideo.addEventListener("input", (event) => {
        speedVideo.style.width = ((event.target.value.length + 1) * 8) + 'px';
    });
    sliderSpeedVideo.addEventListener("input", (event) => {
        setValue(event.target.value);
    });

    selectSpeedItem.addEventListener("click", (event) => {

        for (let button of buttons) {
            if (button.contains(event.target) && button.dataset.valueSpeed) {
                setValue(button.dataset.valueSpeed);
            }
        }
        
    });

    speedVideo.value = videoApi.playbackRate;
    speedVideo.dispatchEvent(new Event("change"));

    return {
        name: "Скорость воспроизведения",
        description: "Выберите темп воспроизведения видео"
    };

}