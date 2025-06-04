// imports ================================================== //
import range from "../lib/math.js";

// helpers ================================================== //
// прячем controls в определённых случаях
function addEventHideControls(videoApi, showingDuration = 0, hideDuration = 0, timeoutDuration = 0) {

    function handleMouseEnter(eventMouseEnter) {

        let idTimeoutHide = null;

        function handleMove(eventMove) {

            clearTimeout(idTimeoutHide);

            const isVisible = videoApi.controlsElement.checkVisibility({ opacityProperty: true });

            if (
                isVisible &&
                !videoApi.paused &&
                (eventMove.target === videoApi.controlsElement || !event.isTrusted)
            ) {
                idTimeoutHide = setTimeout(
                    () => {
                        videoApi.controlsElement.style.animation = `disappear ${hideDuration}ms linear forwards`;
                    },
                    timeoutDuration
                );
            } else {
                if (!isVisible) {
                    videoApi.controlsElement.style.animation = `appear ${showingDuration}ms linear forwards`;
                }
            }

        }
        handleMove(eventMouseEnter);

        videoApi.controlsElement.addEventListener("mousemove", handleMove);
        videoApi.controlsElement.addEventListener("mouseleave", () => {

            clearTimeout(idTimeoutHide);

            videoApi.controlsElement.removeEventListener("mousemove", handleMove);

            const isVisible = videoApi.controlsElement.checkVisibility({ opacityProperty: true });

            if (!isVisible) {
                videoApi.controlsElement.style.animation = `appear ${showingDuration}ms linear forwards`;
            }

        }, { once: true });

    }

    videoApi.controlsElement.addEventListener("mouseenter", handleMouseEnter);
    videoApi.controlsElement.addEventListener("click", handleMouseEnter);

}

// main ===================================================== //
// Предоставляет следующие дополнительные api к элементу video:
// * событие 'fullSize' - переход в полноэкранный режим при вызове video.fullSize()
// * событие 'minisize' - выход из полноэкранного режима при вызове video.miniSize()
// * свойство minimized со значением boolean (false - полноэкранный режим, true - обратное первому)
// * событие 'timechange' - изменение свойства video.currentTime
export default function getVideoAPI(elementId) {

    // событие изменения currentTime у ссылки на dom-элемент video
    const eventTimeChange = new CustomEvent("timechange");

    // расширенная дополнительными свойствами dom-ссылка на элемент video
    const VIDEO = Object.assign(
        document.getElementById(elementId),
        // встроенные dom-элементы video
        {
            containerElement: document.getElementById("container_video",),
            controlsElement: document.getElementById("controls_container"),
        },
        // работа с полноэкранным режимом
        {
            minimized: true,
            fullSize() {

                VIDEO.minimized = false;
                if (VIDEO.containerElement.requestFullscreen) {
                    VIDEO.containerElement.requestFullscreen();
                } else if (VIDEO.containerElement.webkitrequestFullscreen) {
                    VIDEO.containerElement.webkitRequestFullscreen();
                } else if (VIDEO.containerElement.mozRequestFullscreen) {
                    VIDEO.containerElement.mozRequestFullScreen();
                } else {
                    VIDEO.containerElement.classList.remove("adaptive_video");
                    VIDEO.containerElement.classList.add("fullscreen_video");
                }

                VIDEO.dispatchEvent(new CustomEvent("fullsize"));

            },
            miniSize() {

                VIDEO.minimized = true;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else {
                    VIDEO_container.classList.remove("fullscreen_video");
                    VIDEO_container.classList.add("adaptive_video");
                }

                VIDEO.dispatchEvent(new CustomEvent("minisize"));

            },
        },
        {
            rewind: {
                
                forward_step: 10,
                back_step: 10,

                forward() {
                    PROXY_VIDEO.currentTime += PROXY_VIDEO.rewind.forward_step;
                },
                back() {
                    PROXY_VIDEO.currentTime -= PROXY_VIDEO.rewind.back_step;
                },

            }
        }
    );

    // proxy для отслеживания взаимодействия с видео. Необходим для
    // вызова самописного события 'timechange' при изменении
    // свойства currentTime у video
    const PROXY_VIDEO = new Proxy(
        VIDEO,
        {
            getPrototypeOf(target) {
                return Object.getPrototypeOf(target)
            },
            set(target, prop, value) {
                target[prop] = value;
                if (prop === "currentTime") VIDEO.dispatchEvent(eventTimeChange);
                if (prop === "volume" && value === 1) VIDEO.dispatchEvent(new Event("volumechange"));
                return true;
            },
            get(target, prop) {
                let value = target[prop];
                if (typeof value === 'function') {
                    value = Function.prototype.bind.call(value, target);
                }
                return value;
            },
            apply(target, args) {
                return Object.apply(target, args);
            },
        }
    );

    // отслеживаем изменение currentTime у video в момент
    // работы события play каждые 16 ms => 60 fps
    // PS: использую вместо timeupdate, т.к. заранее встроенный
    // прослушиватель действует медленно!
    let __intervalId = null;
    PROXY_VIDEO.addEventListener("play", () => {
        __intervalId = setInterval(() => {
            PROXY_VIDEO.dispatchEvent(eventTimeChange);
        }, 16);
    });
    PROXY_VIDEO.addEventListener("paused", () => {
        clearInterval(__intervalId);
    });
    PROXY_VIDEO.addEventListener("ended", () => {
        clearInterval(__intervalId);
    });

    addEventHideControls(PROXY_VIDEO, 300, 200, 1000);

    return PROXY_VIDEO;

};