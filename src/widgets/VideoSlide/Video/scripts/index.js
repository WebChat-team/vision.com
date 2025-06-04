"use client"

// imports ================================================== //
import getVideo from "./video/index.js";
import "./lib/animation.min.js";

// main ===================================================== //
let isLoad = false;
export default function load() {
    if (isLoad) return;
    isLoad = true;
    const video = getVideo();
    // Могу изменить
    // громкость
    // текущую временную метку
    // поставить на паузу, запустить
    // сделать во весь экран и уменьшить экран
    // перемотать видео вперёд и назад

    // initial values (изначально заданные настройки видеоплеера)
    video.volume = 0;

    return video;
    
}
