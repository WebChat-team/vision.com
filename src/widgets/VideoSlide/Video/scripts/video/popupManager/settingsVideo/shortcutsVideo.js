// imports ================================================== //
import shortctuManager from "../../../shortcutManager/index.js";

// helpers ================================================== //
function getHandleEventClick(videoApi, sectionSetting) {

    let active_child = null;

    return function (event) {

        clearHandleKeydown();

        for (const child of sectionSetting.children) {
            if (child.contains(event.target)) {

                active_child = child;
                child.style.animation = "change_key 1.5s ease-in-out infinite";

                window.addEventListener("keydown", handleKeydown);
                window.addEventListener("keyup", clearHandleKeydown, { once: true });

            }
        }

    };

    function handleKeydown(eventKeydown) {

        if (active_child) {

            const shortcut = shortctuManager.getShortcutByKeydownEvent(eventKeydown);
            const actionName = active_child.dataset.actionName;

            shortctuManager.setShortuct(shortcut, actionName);
            active_child.querySelector(".keys_shortcut").innerText = shortctuManager.getTextShortcut(shortcut);

        }

    }
    function clearHandleKeydown() {

        if (active_child) {

            active_child.style.animation = "";
            active_child = null;

            window.removeEventListener("keydown", handleKeydown);

        }

    }

}

// main ===================================================== //
// Участок кода, который необходимо передать ChatGPT, чтобы
// оценить результат работы по написанию производительного кода
export default function getShortcutSettingVideo(videoApi, sectionSetting) {


    if (!sectionSetting.children.length) {

        for (let [actionName, { description }] of shortctuManager.getActionsBySection("settings").entries()) {

            let textShortcut = shortctuManager.getTextShortcutByActionName(actionName);

            let keys_shortcut = "";
            if (textShortcut) {
                keys_shortcut = `
                    <span class="keys_shortcut">
                        ${textShortcut}
                    </span>
                `;
            }

            sectionSetting.innerHTML += `
                <div data-action-name="${actionName}" class="shortcut">
                    <span class="description_shortcut">
                        ${description}
                    </span>
                    ${keys_shortcut}
                </div>
            `;

        }

    }

    const handleClick = getHandleEventClick(videoApi, sectionSetting);
    sectionSetting.addEventListener("click", handleClick);
    return () => {
        sectionSetting.click();
        sectionSetting.removeEventListener("click", handleClick);
    };

};