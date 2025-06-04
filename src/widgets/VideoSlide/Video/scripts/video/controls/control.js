export default function getControl(elementId) {

    const html = document.getElementById(elementId);
    if (!html) return null;

    const statuses = new Set(html.dataset.icons?.match(/[a-zA-Z\-]+/g) || []);
    const iconHtml = html.querySelector(".icon_player_button");

    html.changeIconStatus = (newStatus) => {
        if (statuses.has(newStatus) && iconHtml) {
            html.iconStatus = newStatus;
            iconHtml.classList.forEach(classItem => {
                if (classItem.startsWith("icon-")) {
                    iconHtml.classList.remove(classItem);
                }
            });
            iconHtml.classList.add(`icon-${newStatus}`);
        }
    };

    return html;

}