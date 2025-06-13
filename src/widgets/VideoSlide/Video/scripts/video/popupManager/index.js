// imports ================================================== //
import getSettingsPopup from "./settingsVideo/index.js";
import { AnimationJS } from "moveton";

// main ===================================================== //
export default function addPopupManagerForVideoPlayer(videoApi) {

    // добавляем свойство popup к videoApi для работы с popup-ами:
    // * isMovingSlider
    let isPlayingVideoBeforeShowingPopup = false;
    videoApi.popup = {

        activePopupName: null,

        show(namePopup) {

            if (popups[namePopup]) {

                if (this.activePopupName) popups[this.activePopupName].hide();

                if (!videoApi.paused) {
                    videoApi.pause();
                    isPlayingVideoBeforeShowingPopup = true;
                }

                if (!darkness.checkVisibility()) {
                    darkness.style.display = "block";
                    new AnimationJS([darkness], { opacity: "0 -> 1" }).start("linear", 300);
                }

                popups[namePopup].show();
                this.activePopupName = namePopup;

            }

        },
        hide(namePopup) {

            if (popups[namePopup] && popups[namePopup].checkVisibility()) {

                if (isPlayingVideoBeforeShowingPopup) {
                    videoApi.play();
                    isPlayingVideoBeforeShowingPopup = false;
                }

                new AnimationJS([darkness], { opacity: "1 -> 0" })
                    .start("linear", 300)
                    .then(() => { darkness.style.display = "none"; });

                popups[namePopup].hide();
                this.activePopupName = null;

            }

        },

    };

    const darkness = document.getElementById("darkness");
    const popups = {
        settings: getSettingsPopup(videoApi)
    };

};