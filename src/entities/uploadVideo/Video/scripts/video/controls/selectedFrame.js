// imports ================================================== //
import range from "../lib/math.js";
import { getFormatedTime } from "../lib/time.js";

// main ===================================================== //
export default function getSelectedFrame(videoApi) {

    // события selected frame
    const selectedFrame = Object.assign(
        document.getElementById("selected_frame"),
        {
            additionalInfo: document.getElementById("additional_info"),
            photo: document.getElementById("photo_selected_frame"),
            time: document.getElementById("time_selected_frame"),
            show() {
                if (!this.checkVisibility()) this.style.display = "block";
            },
            hide() {
                if (this.checkVisibility()) this.style.display = "none";
            },
            setPosition(percentView) {

                const sliderLineWidth = 15;
                const availableWidth = this.additionalInfo.offsetWidth - sliderLineWidth;
                const percentWidth = this.offsetWidth / availableWidth;
                const specialCoefficient = 7.5 / availableWidth;

                const leftPosition = range(
                    -specialCoefficient, 
                    percentView - (percentWidth / 2), 
                    1 - (percentWidth - specialCoefficient)
                );

                this.style.left = (leftPosition * 100) + "%"
                
            }
        }
    );
    if (!selectedFrame || !selectedFrame.additionalInfo || !selectedFrame.photo || !selectedFrame.time) {
        console.warn("Не найдены необходимые элементы для selected frame.");
        return null;
    }

    // события video
    videoApi.addEventListener("movingSlider", (event) => {

        selectedFrame.show();

        // Прячем фото, чтобы отображалась только информация о времени
        selectedFrame.photo.style.display = "none";
        selectedFrame.time.innerText = getFormatedTime(videoApi.currentTime);
        selectedFrame.setPosition(event.detail.value);

    });
    videoApi.addEventListener("movedSlider", (event) => {

        // Показываем фото после окончания перемещения слайдера
        selectedFrame.photo.style.display = "block";

        if (videoApi.isHoverSlider) {
            selectedFrame.setPosition(event.detail.value);
        } else {
            selectedFrame.hide();
        }


    });
    videoApi.addEventListener("overSlider", () => {
        if (!videoApi.isMovingSlider) selectedFrame.show();
    });
    videoApi.addEventListener("hoverSlider", (event) => {
        if (!videoApi.isMovingSlider) {
            const newHoverTime = (videoApi.duration * event.detail.value);
            // Обновляем текущий кадр (если photo — видео, можно использовать currentTime)
            selectedFrame.photo.currentTime = newHoverTime;
            selectedFrame.time.innerText = getFormatedTime(newHoverTime);
            selectedFrame.setPosition(event.detail.value);
        }
    });
    videoApi.addEventListener("leaveSlider", () => {
        if (!videoApi.isMovingSlider) selectedFrame.hide();
    });

    return selectedFrame;

};