// imports ================================================== //
import { getFormatedTime } from "../lib/time.js";

// main ===================================================== //
export default function getTimeVideo(videoApi) {
    
    // события timeVideo
    const timeVideo = Object.assign(
        document.getElementById("timeVideo"),
        {
            currentTime: document.getElementById("currentTime"),
            durationTime: document.getElementById("durationTime"),
        }
    );
    if (!timeVideo || !timeVideo.currentTime || !timeVideo.durationTime) {
        console.warn("Не найдены необходимые элементы для отображения времени видео.");
        return null;
    }

    // события videoApi
    video.addEventListener('loadedmetadata', () => {
        timeVideo.durationTime.innerText = getFormatedTime(video.duration);
    }, { once: true });
    videoApi.addEventListener("timechange", () => {
        timeVideo.currentTime.innerText = getFormatedTime(videoApi.currentTime);
    });

    return timeVideo;

}