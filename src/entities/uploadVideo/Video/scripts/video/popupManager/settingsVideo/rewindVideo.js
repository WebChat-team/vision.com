// imports ================================================== //
import range from "../../lib/math.js";

// main ===================================================== //
export default function (videoApi, sectionSetting) {

    // перемтока видео вперед
    const timeIntervalForwardRewindVideo = document.getElementById("timeIntervalForwardRewindVideo");
    timeIntervalForwardRewindVideo.addEventListener("change", (event) => {
        const newValue = range(timeIntervalForwardRewindVideo.min, Number(event.target.value), timeIntervalForwardRewindVideo.max)
        videoApi.rewind.forward_step = newValue;
        timeIntervalForwardRewindVideo.value = newValue;
    });
    timeIntervalForwardRewindVideo.value = videoApi.rewind.forward_step;
    
    // перемотка видео назад
    const timeIntervalBackRewindVideo = document.getElementById("timeIntervalBackRewindVideo");
    timeIntervalBackRewindVideo.addEventListener("change", (event) => {
        const newValue = range(timeIntervalBackRewindVideo.min, Number(event.target.value), timeIntervalBackRewindVideo.max)
        videoApi.rewind.back_step = newValue;
        timeIntervalBackRewindVideo.value = newValue;
    });
    timeIntervalBackRewindVideo.value = videoApi.rewind.back_step;

};