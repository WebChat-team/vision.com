// imports ================================================== //
import getControl from "./control.js";

// main ===================================================== //
export default function getSwitchPopupSettings(videoApi) {

    const SWITCH_POPUP_SETTINGS = Object.assign(
        getControl("settingsVideo"),
        {
            containerActions: document.getElementById("container_actions_settings"),
        }
    );

    SWITCH_POPUP_SETTINGS.addEventListener("click", () => {
        if (videoApi.popup.activePopupName === "settings") {
            videoApi.popup.hide("settings");
        } else {
            videoApi.popup.show("settings");
        }
    });

    return SWITCH_POPUP_SETTINGS;

};