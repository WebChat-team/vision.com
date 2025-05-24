// imports ================================================== //
import range from "../lib/math.js";

// main ===================================================== //
// Добавляет к video api дополнительные возможности:
// * событие 'movingSlider' - перемещение ползунка временной линии
// * событие 'movedSlider' - окончание события перемещения ползунка временной линии
// * событие 'overSlider' - наведение курсора на временную линию
// * событие 'hoverSlider' - перемещение курсора по временной линии без перемещения ползунка
// * событие 'leaveSlider' - наведение курсора на временную линию
// * isHoverSlider - boolean значение (true - курсор на слайдере)
// * isMovingSlider - boolean значение (true - перемещение ползунка)
function getProgressViewingControl(videoApi) {

    // coбытия progress viewing
    const PROGRESS_VIEWING = Object.assign(
        document.getElementById("progress_viewing"),
        {
            isMovingSlider: false,
            isHoverSlider: false,
            progressLine: document.getElementById("viewing_progress_line"),
            slider: document.getElementById("viewing_progress_slider"),
            nextPointView: document.getElementById("next_point_view_progress"),
            __getPoint(clientX) {

                const minValue = this.slider.offsetWidth / 2;
                const maxValue = this.offsetWidth - this.slider.offsetWidth / 2;
                const leftProgressViewingSlider = this.getBoundingClientRect().left;

                const leftPositionPoint = range(minValue, (clientX - leftProgressViewingSlider), maxValue);
                return (leftPositionPoint - minValue) / (maxValue - minValue);

            },
        }
    );
    if (!PROGRESS_VIEWING || !PROGRESS_VIEWING.progressLine || !PROGRESS_VIEWING.slider || !PROGRESS_VIEWING.nextPointView) {
        console.warn("Не найдены необходимые элементы прогресс-бара.");
        return null;
    }

    function getOptionsMoveEvent(clientX) {
        return {
            detail: {
                get value() { return PROGRESS_VIEWING.__getPoint(clientX) }
            }
        }
    };
    PROGRESS_VIEWING.addEventListener("mousedown", (eventMouseDown) => {

        PROGRESS_VIEWING.isMovingSlider = true;

        function handleMove(eventMove) {
            videoApi.currentTime = PROGRESS_VIEWING.__getPoint(eventMove.clientX) * videoApi.duration;
            videoApi.dispatchEvent(new CustomEvent("movingSlider", getOptionsMoveEvent(eventMove.clientX)));
        }
        handleMove(eventMouseDown);

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", handleMove);
            PROGRESS_VIEWING.isMovingSlider = false;
            videoApi.dispatchEvent(new CustomEvent("movedSlider", getOptionsMoveEvent(eventMouseDown.clientX)));
        });

    });
    PROGRESS_VIEWING.addEventListener("mouseenter", (eventEnter) => {

        PROGRESS_VIEWING.isHoverSlider = true;

        videoApi.dispatchEvent(new CustomEvent("overSlider", getOptionsMoveEvent(eventEnter.clientX)));

        function handleMove(eventMove) {
            videoApi.dispatchEvent(new CustomEvent("hoverSlider", getOptionsMoveEvent(eventMove.clientX)));
        }
        handleMove(eventEnter);

        PROGRESS_VIEWING.addEventListener("mousemove", handleMove);
        PROGRESS_VIEWING.addEventListener("mouseleave", () => {
            PROGRESS_VIEWING.removeEventListener("mousemove", handleMove);
            PROGRESS_VIEWING.isHoverSlider = false;
            videoApi.dispatchEvent(new CustomEvent("leaveSlider"));
        });

    });

    // связываем свойство videoApi со свойством ProgressViewing:
    // * isMovingSlider
    // * isMovingSlider
    Object.defineProperties(
        videoApi,
        {
            isMovingSlider: {
                get() { return PROGRESS_VIEWING.isMovingSlider; }
            },
            isHoverSlider: {
                get() { return PROGRESS_VIEWING.isHoverSlider; }
            },
        }
    );

    // события video
    videoApi.addEventListener("timechange", () => {

        // change width progress line
        const min = PROGRESS_VIEWING.slider.offsetWidth / 2;
        const max = PROGRESS_VIEWING.offsetWidth - PROGRESS_VIEWING.slider.offsetWidth / 2;

        const valueInPercent = (videoApi.currentTime / videoApi.duration);
        const payload = ((valueInPercent * (max - min)) + ((0 < valueInPercent) ? (min * 2) : 0));
        PROGRESS_VIEWING.progressLine.style.width = (payload / PROGRESS_VIEWING.offsetWidth) * 100 + "%";

    });

    return PROGRESS_VIEWING;

};

export default getProgressViewingControl;