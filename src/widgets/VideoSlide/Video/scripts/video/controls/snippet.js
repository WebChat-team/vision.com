// imports ================================================== //
import range from "../lib/math.js";
import shortcutManager from "../../shortcutManager/index.js";

// helpers ================================================== //
function appear(element) {
    return new AnimationJS([element], { opacity: "0 -> 1" }).start("linear", 150);
}
function disappear(element) {
    return new AnimationJS([element], { opacity: "1 -> 0" }).start("linear", 150).then(() => element.style.display = "none");
}

// main ===================================================== //
export default function addSnippet(
    progress_viewing,
    element,
    description,
    actionNames = []
) {

    const snippet = document.getElementById("snippet");
    const descriptionSnippet = document.getElementById("descriptionSnippet");
    const keycupsSnippet = document.getElementById("keycupsSnippet");

    let timeoutId = null;
    let isVisible = false;

    element.addEventListener("mouseenter", () => {

        timeoutId = setTimeout(async () => {

            descriptionSnippet.innerText = description;

            const listActionsNames = Array.isArray(actionNames) ? actionNames : [actionNames];

            if (listActionsNames.length) {
                keycupsSnippet.style.display = "inline-block";
                keycupsSnippet.innerHTML = listActionsNames.reduce(
                    (html, actionName) => {
                        const textShortcut = shortcutManager.getTextShortcutByActionName(actionName);
                        if (textShortcut) {
                            html += `<span class='keyboard_snippet'>${textShortcut}</span>`;
                        }
                        return html;
                    },
                    ""
                );
            } else {
                keycupsSnippet.style.display = "none";
            }

            const leftPositionSnippet = (
                (element.getBoundingClientRect().x - progress_viewing.getBoundingClientRect().x) +
                (element.offsetWidth / 2)
            );

            snippet.style.display = "inline-block";
            snippet.style.left = range(0, (leftPositionSnippet - (snippet.offsetWidth / 2)), (progress_viewing.offsetWidth - snippet.offsetWidth - 8)) + "px";

            await disappear(progress_viewing);
            appear(snippet);

            isVisible = true;

        }, 750);

        element.addEventListener("mousedown", () => {
            element.dispatchEvent(new Event("mouseleave"));
        }, { once: true });

    });
    element.addEventListener("mouseleave", async () => {

        if (isVisible) {

            isVisible = false;

            await disappear(snippet);
            appear(progress_viewing);

            progress_viewing.style.display = "flex";

        } else {
            clearTimeout(timeoutId);
        }

    });

};