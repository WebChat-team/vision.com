// imports ================================================== //
import rewindVideo from "./rewindVideo.js";
import getShortcutSettingVideo from "./shortcutsVideo.js";
import getSettingsSpeedVideo from "./speedVideo.js";
import { AnimationJS, AnimationCSS } from "moveton";

// main ===================================================== //
export default function getSettingsPopup(videoApi) {

    const SETTINGS_POPUP = Object.assign(
        document.getElementById("settings_popup"),
        {
            body: Object.assign(
                document.getElementById("body_settings_popup"),
                {
                    links: document.querySelectorAll(".nav_settings > .setting_video[data-name-setting]"),
                }
            ),
            header: {
                backButton: document.getElementById("backSetting"),
                nameSection: document.getElementById("nameSectionSettingPopup"),
            },
            footer: {
                close: document.getElementById("closeSettingsPopup"),
            },
            __listVideoSettings: {
                speed_video: getSettingsSpeedVideo,
                shortcuts_video: getShortcutSettingVideo,
                rewind_video: rewindVideo,
            },
            show() {

                if (!this.checkVisibility()) {

                    this.style.display = "flex";
                    new AnimationJS([this], { right: `${-this.offsetWidth} -> 15 px` })
                        .start("easeOutSine", 300);

                }

            },
            hide() {

                if (this.header.backButton.checkVisibility()) {
                    this.header.backButton.click();
                }

                if (this.checkVisibility()) {

                    new AnimationCSS([this], { right: `15 -> ${-this.offsetWidth} px` })
                        .start("ease-out .3s")
                        .then(() => { this.style.display = "none"; });

                }

            },
        }
    );

    let clearSettingEnvironment = null;
    let activeSettingName = null;
    SETTINGS_POPUP.body.addEventListener("click", (event) => {

        for (let link of SETTINGS_POPUP.body.links) {
            if (link.contains(event.target)) {

                activeSettingName = link.dataset.nameSetting;

                const sectionSetting = document.querySelector(`.main_setting > div[data-name-setting='${activeSettingName}']`);
                if (activeSettingName in SETTINGS_POPUP.__listVideoSettings) {
                    const clearEnvironment = SETTINGS_POPUP.__listVideoSettings[activeSettingName](videoApi, sectionSetting);
                    if (typeof clearEnvironment === "function") clearSettingEnvironment = clearEnvironment;
                }

                if (sectionSetting) {

                    sectionSetting.style.display = "block";
                    new AnimationJS([SETTINGS_POPUP.body], { left: "0 -> -100 %" }).start("easeOutQuad", 300);

                    SETTINGS_POPUP.header.backButton.style.display = "block";
                    SETTINGS_POPUP.header.nameSection.innerText = link.querySelector(".title_setting").innerText;

                }

            }
        }

    });
    SETTINGS_POPUP.header.backButton.addEventListener("click", () => {

        if (activeSettingName) {

            if (clearSettingEnvironment) {
                clearSettingEnvironment();
                clearSettingEnvironment = null;
            }

            new AnimationJS([SETTINGS_POPUP.body], { left: "-100 -> 0 %" })
                .start("easeOutQuad", 300)
                .then(() => {
                    const sectionSetting = document.querySelector(`.main_setting > div[data-name-setting='${activeSettingName}']`);
                    if (sectionSetting) sectionSetting.style.display = "none";
                    activeSettingName = null;
                });

            SETTINGS_POPUP.header.backButton.style.display = "none";
            SETTINGS_POPUP.header.nameSection.innerText = "Настройки видеоплеера";

        }

    });
    SETTINGS_POPUP.footer.close.addEventListener("click", () => {
        videoApi.popup.hide("settings");
    });

    return SETTINGS_POPUP;

}